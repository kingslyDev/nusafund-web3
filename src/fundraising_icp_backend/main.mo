import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Iter "mo:base/Iter";

actor FundraisingCanister {

    public type Campaign = {
        id: Nat;
        creator: Principal;
        title: Text;
        description: Text;
        goal_amount: Nat;
        raised: Nat;
        start_date: Text;
        end_date: Text;
        is_active: Bool;
        image: ?Text;
    };

    public type Donation = {
        id: Nat;
        campaign_id: Nat;
        donor_address: Text;
        amount: Nat;
        transaction_hash: Text;
        created_at: Text;
    };

    stable var campaigns: [Campaign] = [];
    stable var donations: [Donation] = [];
    stable var nextCampaignId: Nat = 1;
    stable var nextDonationId: Nat = 1;

    public shared(msg) func addCampaign(
        title: Text,
        description: Text,
        goal_amount: Nat,
        start_date: Text,
        end_date: Text,
        image: ?Text
    ): async Campaign {
        if (goal_amount <= 0) {
            throw Error.reject("Goal amount must be greater than 0");
        };

        let newCampaign: Campaign = {
            id = nextCampaignId;
            creator = msg.caller;
            title = title;
            description = description;
            goal_amount = goal_amount;
            raised = 0;
            start_date = start_date;
            end_date = end_date;
            is_active = true;
            image = image;
        };

        campaigns := Array.append<Campaign>(campaigns, [newCampaign]);
        nextCampaignId += 1;
        return newCampaign;
    };

    public shared(msg) func donate(
        campaign_id: Nat,
        amount: Nat,
        created_at: Text
    ): async Donation {
        if (amount <= 0) {
            throw Error.reject("Donation amount must be greater than 0");
        };

        let index: ?Nat = findCampaignIndex(campaign_id);
        if (index == null) {
            throw Error.reject("Campaign not found");
        };

        let i = switch (index) {
            case (?value) value;
            case null 0; // Tidak akan pernah terjadi karena dicek di atas
        };

        let campaign = campaigns[i];

        if (campaign.is_active != true) {
            throw Error.reject("Campaign is not active");
        };

        let updatedBalance: Nat = campaign.raised + amount;
        let updated_campaign = {
            id = campaign.id;
            creator = campaign.creator;
            title = campaign.title;
            description = campaign.description;
            goal_amount = campaign.goal_amount;
            raised = updatedBalance;
            start_date = campaign.start_date;
            end_date = campaign.end_date;
            is_active = if (updatedBalance >= campaign.goal_amount) false else campaign.is_active;
            image = campaign.image;
        };

        let prefix = Array.subArray<Campaign>(campaigns, 0, i);
        let size = Array.size<Campaign>(campaigns);
        let suffix = if (i + 1 < size) {
            Array.subArray<Campaign>(campaigns, i + 1, size - (i + 1))
        } else {
            []
        };

        campaigns := Array.append<Campaign>(
            Array.append<Campaign>(prefix, [updated_campaign]),
            suffix
        );

        let transaction_hash: Text = "tx_" # Principal.toText(msg.caller) # "_" # Nat.toText(nextDonationId);

        let newDonation: Donation = {
            id = nextDonationId;
            campaign_id = campaign_id;
            donor_address = Principal.toText(msg.caller);
            amount = amount;
            transaction_hash = transaction_hash;
            created_at = created_at;
        };

        donations := Array.append<Donation>(donations, [newDonation]);
        nextDonationId += 1;

        return newDonation;
    };

    public query func getCampaigns(): async [Campaign] {
        return campaigns;
    };

    public query func getDonations(campaign_id: Nat): async [Donation] {
        return Array.filter<Donation>(
            donations,
            func(d: Donation): Bool { d.campaign_id == campaign_id }
        );
    };

    public query func getCampaignById(campaign_id: Nat): async ?Campaign {
        let index: ?Nat = findCampaignIndex(campaign_id);
        if (index == null) {
            return null;
        };

        let i = switch (index) {
            case (?value) value;
            case null 0;
        };

        return ?campaigns[i];
    };

    private func findCampaignIndex(campaign_id: Nat): ?Nat {
        let size = Array.size<Campaign>(campaigns);
        if (size == 0) {
            return null;
        };

        for (i in Iter.range(0, size - 1)) {
            if (campaigns[i].id == campaign_id) {
                return ?i;
            };
        };
        return null;
    };
}
