import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";

actor {
    // Tipe Data Transaksi
    type TransactionType = {
        #Donation;
        #Withdrawal;
    };

    // Tipe Data Transaksi Lengkap
    type Transaction = {
        id: Text;
        transactionType: TransactionType;
        amount: Nat64;
        from: Principal;
        to: Text; // Campaign ID atau penerima lainnya
        timestamp: Time.Time;
    };

    // Stable Storage untuk Transaksi
    stable var transactionsEntries : [(Text, Transaction)] = [];

    // HashMap untuk Transaksi
    let transactions = HashMap.HashMap<Text, Transaction>(
        10, Text.equal, Text.hash
    );

    // Fungsi untuk Mencatat Transaksi Donasi
    public shared func recordDonation(
        campaignId: Text, 
        amount: Nat64, 
        donor: Principal
    ) : async Result.Result<Transaction, Text> {
        let transactionId = generateUniqueId();
        
        let donationTransaction : Transaction = {
            id = transactionId;
            transactionType = #Donation;
            amount = amount;
            from = donor;
            to = campaignId;
            timestamp = Time.now();
        };

        transactions.put(transactionId, donationTransaction);
        return #ok(donationTransaction);
    };

    // Fungsi untuk Mencatat Penarikan Dana
    public shared func recordWithdrawal(
        campaignId: Text, 
        amount: Nat64, 
        recipient: Principal
    ) : async Result.Result<Transaction, Text> {
        let transactionId = generateUniqueId();
        
        let withdrawalTransaction : Transaction = {
            id = transactionId;
            transactionType = #Withdrawal;
            amount = amount;
            from = recipient;
            to = campaignId;
            timestamp = Time.now();
        };

        transactions.put(transactionId, withdrawalTransaction);
        return #ok(withdrawalTransaction);
    };

    // Query untuk Mendapatkan Semua Transaksi
    public query func getAllTransactions() : async [Transaction] {
        Iter.toArray(transactions.vals())
    };

    // Query untuk Mendapatkan Transaksi berdasarkan Campaign
    public query func getTransactionsByCampaign(campaignId: Text) : async [Transaction] {
        Iter.toArray(
            Iter.filter(
                transactions.vals(), 
                func(transaction: Transaction) : Bool { 
                    transaction.to == campaignId 
                }
            )
        )
    };

    // Query untuk Mendapatkan Transaksi berdasarkan Pengirim
    public query func getTransactionsByUser(user: Principal) : async [Transaction] {
        Iter.toArray(
            Iter.filter(
                transactions.vals(), 
                func(transaction: Transaction) : Bool { 
                    transaction.from == user 
                }
            )
        )
    };

    // Utility Function untuk Generate ID Unik
    func generateUniqueId() : Text {
        let timestamp = Nat64.fromIntWrap(Time.now());
        return debug_show(timestamp);
    };

    // System Upgrade Hooks
    system func preupgrade() {
        transactionsEntries := Iter.toArray(transactions.entries());
    };

    system func postupgrade() {
        for ((transactionId, transaction) in transactionsEntries.vals()) {
            transactions.put(transactionId, transaction);
        };

        // Reset stable storage
        transactionsEntries := [];
    };
}