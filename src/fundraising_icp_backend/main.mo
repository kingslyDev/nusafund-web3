import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Ledger "canister:icp_ledger_canister";
//import IC "ic:canister";
import Identity "mo:base/Principal";


actor {
    // Tipe Data Role dan Permission
    type Role = {
        #Admin;
        #Moderator;
        #VerifiedUser;
        #StandardUser;
    };

    type Permission = {
        createCampaign: Bool;
        withdrawFunds: Bool;
        approveFundraising: Bool;
        manageUsers: Bool;
    };

    // User Profile
    type UserProfile = {
        principal: Principal;
        role: Role;
        permissions: Permission;
        isKYCVerified: Bool;
    };

    // Tipe Data Kampanye
    type Campaign = {
        id: Text;
        title: Text;
        description: Text;
        target: Nat64;
        currentAmount: Nat64;
        creator: Principal;
        startDate: Time.Time;
        endDate: Time.Time;
        status: CampaignStatus;
        withdrawalRequests: [WithdrawalRequest];
    };

    type Transaction = {
    id: Text;
    transactionType: {
        #Donation;
        #Withdrawal;
    };
    amount: Nat64;
    from: Principal;
    to: Text;
    timestamp: Time.Time;
};

    // Status Kampanye
    type CampaignStatus = {
        #Active;
        #Completed;
        #Cancelled;
    };

    // Withdrawal Request
    type WithdrawalRequest = {
        id: Text;
        campaignId: Text;
        amount: Nat64;
        status: WithdrawalStatus;
        requestedBy: Principal;
        timestamp: Time.Time;
    };

    type WithdrawalStatus = {
        #Pending;
        #Approved;
        #Rejected;
    };

    public type LoginResult = {
        principal: Principal;
        isNewUser: Bool;
    };

    // Stable Storage
    stable var usersEntries : [(Principal, UserProfile)] = [];
    stable var campaignsEntries : [(Text, Campaign)] = [];
    stable var withdrawalRequestsEntries : [(Text, WithdrawalRequest)] = [];

    // Hashmaps
    let users = HashMap.HashMap<Principal, UserProfile>(
        10, Principal.equal, Principal.hash
    );
    let campaigns = HashMap.HashMap<Text, Campaign>(
        10, Text.equal, Text.hash
    );
    let withdrawalRequests = HashMap.HashMap<Text, WithdrawalRequest>(
        10, Text.equal, Text.hash
    );

    // Admin Principal (diganti dengan principal admin sebenarnya)
    let ADMIN_PRINCIPAL = Principal.fromText("vxozr-3gig4-7qcgq-z6kpg-bd7fj-utgna-7nj6t-cb4fo-wlpxv-mulvm-fqe");

    // Middleware untuk Validasi Role
    func hasPermission(
        caller: Principal, 
        requiredPermission: Permission -> Bool
    ) : Bool {
        switch (users.get(caller)) {
            case (?userProfile) {
                requiredPermission(userProfile.permissions) and 
                userProfile.isKYCVerified
            };
            case null false;
        }
    };

    // Fungsi Manajemen User (Hanya Admin)
    public shared({ caller }) func registerUser(
        userPrincipal: Principal, 
        role: Role
    ) : async Result.Result<UserProfile, Text> {
        // Hanya admin yang bisa mendaftarkan user
        if (caller != ADMIN_PRINCIPAL) {
            return #err("Unauthorized");
        };

        let defaultPermissions = switch(role) {
            case (#Admin) {
                {
                    createCampaign = true;
                    withdrawFunds = true;
                    approveFundraising = true;
                    manageUsers = true;
                }
            };
            case (#Moderator) {
                {
                    createCampaign = true;
                    withdrawFunds = false;
                    approveFundraising = true;
                    manageUsers = false;
                }
            };
            case (#VerifiedUser) {
                {
                    createCampaign = true;
                    withdrawFunds = false;
                    approveFundraising = false;
                    manageUsers = false;
                }
            };
            case (#StandardUser) {
                {
                    createCampaign = false;
                    withdrawFunds = false;
                    approveFundraising = false;
                    manageUsers = false;
                }
            };
        };

        let userProfile : UserProfile = {
            principal = userPrincipal;
            role = role;
            permissions = defaultPermissions;
            isKYCVerified = false;
        };

        users.put(userPrincipal, userProfile);
        return #ok(userProfile);
    };

    public shared(msg) func loginWithInternetIdentity() : async LoginResult {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
        case (null) {
            // Pengguna baru
            let newUser : UserProfile = {
                principal = caller;
                role = #StandardUser;
                permissions = {
                    createCampaign = false;
                    withdrawFunds = false;
                    approveFundraising = false;
                    manageUsers = false;
                };
                isKYCVerified = false;
            };
            users.put(caller, newUser);
            return {
                principal = caller;
                isNewUser = true;
            };
        };
        case (?existingUser) {
            return {
                principal = caller;
                isNewUser = false;
            };
        };
    };
};

// Fungsi untuk Plug Wallet
public shared(msg) func connectPlugWallet() : async LoginResult {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
        case (null) {
            let newUser : UserProfile = {
                principal = caller;
                role = #StandardUser;
                permissions = {
                    createCampaign = false;
                    withdrawFunds = false;
                    approveFundraising = false;
                    manageUsers = false;
                };
                isKYCVerified = false;
            };
            users.put(caller, newUser);
            return {
                principal = caller;
                isNewUser = true;
            };
        };
        case (?existingUser) {
            return {
                principal = caller;
                isNewUser = false;
            };
        };
    };
};

    // KYC Verification (Hanya Admin)
    public shared({ caller }) func verifyKYC(
        userPrincipal: Principal
    ) : async Result.Result<UserProfile, Text> {
        if (caller != ADMIN_PRINCIPAL) {
            return #err("Unauthorized");
        };

        switch (users.get(userPrincipal)) {
            case (?userProfile) {
                let updatedProfile = {
                    userProfile with 
                    isKYCVerified = true
                };
                users.put(userPrincipal, updatedProfile);
                return #ok(updatedProfile);
            };
            case null #err("User not found");
        };
    };

    // Create Campaign (Hanya User Terverifikasi)
    public shared({ caller }) func createCampaign(
        title: Text, 
        description: Text, 
        target: Nat64, 
        endDate: Time.Time
    ) : async Result.Result<Campaign, Text> {
        if (not hasPermission(caller, func(p) = p.createCampaign)) {
            return #err("Unauthorized or KYC not completed");
        };

        let campaignId = generateUniqueId();
        let newCampaign : Campaign = {
            id = campaignId;
            title = title;
            description = description;
            target = target;
            currentAmount = 0;
            creator = caller;
            startDate = Time.now();
            endDate = endDate;
            status = #Active;
            withdrawalRequests = [];
        };

        campaigns.put(campaignId, newCampaign);
        return #ok(newCampaign);
    };

    // Ajukan Withdrawal
    public shared({ caller }) func requestWithdrawal(
        campaignId: Text,
        amount: Nat64
    ) : async Result.Result<WithdrawalRequest, Text> {
        // Cek kampanye
        switch (campaigns.get(campaignId)) {
            case (?campaign) {
                // Hanya creator yang bisa request
                if (campaign.creator != caller) {
                    return #err("Unauthorized");
                };

                // Cek saldo cukup
                if (amount > campaign.currentAmount) {
                    return #err("Insufficient funds");
                };

                let withdrawalId = generateUniqueId();
                let withdrawalRequest : WithdrawalRequest = {
                    id = withdrawalId;
                    campaignId = campaignId;
                    amount = amount;
                    status = #Pending;
                    requestedBy = caller;
                    timestamp = Time.now();
                };

                withdrawalRequests.put(withdrawalId, withdrawalRequest);
                
                // Update campaign withdrawal requests
                let updatedCampaign = {
                    campaign with 
                    withdrawalRequests = 
                        Array.append(campaign.withdrawalRequests, [withdrawalRequest])
                };
                campaigns.put(campaignId, updatedCampaign);

                return #ok(withdrawalRequest);
            };
            case null #err("Campaign not found");
        };
    };

        // Approve Withdrawal (Hanya Admin)
    public shared({ caller }) func approveWithdrawal(
        withdrawalId: Text
    ) : async Result.Result<WithdrawalRequest, Text> {
        // Pastikan hanya admin yang bisa approve
        if (caller != ADMIN_PRINCIPAL) {
            return #err("Unauthorized");
        };

        switch (withdrawalRequests.get(withdrawalId)) {
            case (?withdrawalRequest) {
                // Cek status masih pending
                if (withdrawalRequest.status != #Pending) {
                    return #err("Withdrawal already processed");
                };

                // Ambil kampanye terkait
                switch (campaigns.get(withdrawalRequest.campaignId)) {
                    case (?campaign) {
                        // Update status withdrawal
                        let updatedWithdrawalRequest = {
                            withdrawalRequest with 
                            status = #Approved
                        };

                        // Update withdrawal request
                        withdrawalRequests.put(withdrawalId, updatedWithdrawalRequest);

                        // Kurangi saldo kampanye
                        let updatedCampaign = {
                            campaign with 
                            currentAmount = campaign.currentAmount - withdrawalRequest.amount
                        };
                        campaigns.put(campaign.id, updatedCampaign);

                        let ledgerActor = actor("ryjl3-tyaaa-aaaaa-aaaba-cai") : actor {
                recordWithdrawal : (Text, Nat64, Principal) -> async Result.Result<Transaction, Text>
            };

                        return #ok(updatedWithdrawalRequest);
                    };
                    case null #err("Campaign not found");
                };
            };
            case null #err("Withdrawal request not found");
        };
    };

    // Utility Functions
    func generateUniqueId() : Text {
        let timestamp = Nat64.fromIntWrap(Time.now());
        return debug_show(timestamp);
    };

    // Donation Function
    public shared({ caller }) func donate(
        campaignId: Text, 
        amount: Nat64
    ) : async Result.Result<Campaign, Text> {
        switch (campaigns.get(campaignId)) {
            case (?campaign) {
                // Cek status kampanye aktif
                if (campaign.status != #Active) {
                    return #err("Campaign not active");
                };

                // Cek waktu kampanye
                let now = Time.now();
                if (now > campaign.endDate) {
                    return #err("Campaign has ended");
                };

                // Update saldo kampanye
                let updatedCampaign = {
                    campaign with 
                    currentAmount = campaign.currentAmount + amount
                };

                // Update status jika target tercapai
                let finalCampaign = 
                    if (updatedCampaign.currentAmount >= updatedCampaign.target) {
                        { updatedCampaign with status = #Completed }
                    } else {
                        updatedCampaign
                    };

                // Simpan perubahan
                campaigns.put(campaignId, finalCampaign);

                let ledgerActor = actor("ryjl3-tyaaa-aaaaa-aaaba-cai") : actor {
                recordDonation : (Text, Nat64, Principal) -> async Result.Result<Transaction, Text>
            };

            let donationResult = await ledgerActor.recordDonation(campaignId, amount, caller);


                return #ok(finalCampaign);
            };
            case null #err("Campaign not found");
        };
    };

    // Query Functions
    public query func getCampaigns() : async [Campaign] {
        Iter.toArray(campaigns.vals())
    };

    public query func getCampaignById(campaignId: Text) : async ?Campaign {
        campaigns.get(campaignId)
    };

    public query func getWithdrawalRequests() : async [WithdrawalRequest] {
        Iter.toArray(withdrawalRequests.vals())
    };

    // System Upgrade Hooks
    system func preupgrade() {
        usersEntries := Iter.toArray(users.entries());
        campaignsEntries := Iter.toArray(campaigns.entries());
        withdrawalRequestsEntries := Iter.toArray(withdrawalRequests.entries());
    };

    system func postupgrade() {
        for ((principal, userProfile) in usersEntries.vals()) {
            users.put(principal, userProfile);
        };

        for ((campaignId, campaign) in campaignsEntries.vals()) {
            campaigns.put(campaignId, campaign);
        };

        for ((withdrawalId, request) in withdrawalRequestsEntries.vals()) {
            withdrawalRequests.put(withdrawalId, request);
        };

        // Reset stable storage
        usersEntries := [];
        campaignsEntries := [];
        withdrawalRequestsEntries := [];
    };
}