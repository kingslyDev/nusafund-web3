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
        image: ?Text; // Tambahkan properti untuk menyimpan gambar
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
    image: ?Text // Parameter opsional untuk gambar
): async Campaign {
    // Validasi nilai goal_amount
    if (goal_amount <= 0) {
        throw Error.reject("Goal amount must be greater than 0");
    };

    // Validasi URL gambar jika diberikan
    switch (image) {
        case (?url) {
            if (Text.size(url) == 0 or not Text.startsWith(url, #text "https://")) {
                throw Error.reject("Invalid image URL: URL must start with 'https://'");
            };
            if (Text.contains(url, #text(" "))) {
                throw Error.reject("Invalid image URL: URL must not contain spaces");
            };
        };
        case null {}; // Jika gambar opsional, tidak ada validasi
    };

    // Buat campaign baru
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

    // Tambahkan campaign ke daftar
    campaigns := Array.append<Campaign>(campaigns, [newCampaign]);
    nextCampaignId += 1;
    return newCampaign;
};


    public shared(msg) func donate(
        campaign_id: Nat,
        amount: Nat,
        transaction_hash: Text,
        created_at: Text
    ): async Donation {
        if (amount <= 0) {
            throw Error.reject("Donation amount must be greater than 0");
        };

        // Cari kampanye berdasarkan ID
        let index: ?Nat = findCampaignIndex(campaign_id);
        if (index == null) {
            throw Error.reject("Campaign not found");
        };

        let i = switch (index) {
            case (?value) value;
            case null 0; 
        };

        let campaign = campaigns[i];

        if (campaign.is_active != true) {
            throw Error.reject("Campaign is not active");
        };

        // Update saldo kampanye
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

        // Buat prefix (elemen sebelum i)
        let prefix = Array.subArray<Campaign>(campaigns, 0, i);

        // Buat suffix (elemen setelah i)
        let size = Array.size<Campaign>(campaigns);
        let suffix = if (i + 1 < size) {
            Array.subArray<Campaign>(campaigns, i + 1, size - (i + 1))
        } else {
            []
        };

        // Gabungkan prefix, elemen pengganti, dan suffix untuk membentuk array baru
        campaigns := Array.append<Campaign>(
            Array.append<Campaign>(prefix, [updated_campaign]),
            suffix
        );

        // Tambahkan donasi
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
    
    public shared func deleteAllCampaigns(): async Text {
    // Hapus semua kampanye
    campaigns := [];

    // Reset ID kampanye
    nextCampaignId := 1;

    return "All campaigns have been successfully deleted";
}



}