const mongoose = require("mongoose");
const Inquiry = require("./src/models/inquiry.model"); 
const dbURI = "mongodb+srv://root:root@r3cluster.ikcec.mongodb.net/?retryWrites=true&w=majority&appName=R3Cluster"; 


async function populateData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(dbURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        // Sample customer IDs
        const sampleCustomerIds = [
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f789"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f78a"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f78b"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f78c"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f78d"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f78e"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f78f"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f790"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f791"),
            new mongoose.Types.ObjectId("64e0d6a0f1a2b3c4d5e6f792")
        ];

        // Sample data to insert
        const inquiries = [
            { userName: sampleCustomerIds[0], email: "john.doe@example.com", contactNumber: 1234567890, inquiryCategory: "Food", inquiryMessage: "Question about the menu." },
            { userName: sampleCustomerIds[1], email: "jane.smith@example.com", contactNumber: 2345678901, inquiryCategory: "Games", inquiryMessage: "Issue with the latest game release." },
            { userName: sampleCustomerIds[2], email: "alice.johnson@example.com", contactNumber: 3456789012, inquiryCategory: "Movies", inquiryMessage: "Inquiring about movie showtimes." },
            { userName: sampleCustomerIds[3], email: "bob.brown@example.com", contactNumber: 4567890123, inquiryCategory: "Food", inquiryMessage: "Feedback on the restaurant's service." },
            { userName: sampleCustomerIds[4], email: "carol.white@example.com", contactNumber: 5678901234, inquiryCategory: "Games", inquiryMessage: "Suggestions for new game features." },
            { userName: sampleCustomerIds[5], email: "dave.black@example.com", contactNumber: 6789012345, inquiryCategory: "Movies", inquiryMessage: "Request for movie recommendations." },
            { userName: sampleCustomerIds[6], email: "emily.green@example.com", contactNumber: 7890123456, inquiryCategory: "Food", inquiryMessage: "Query about special dietary options." },
            { userName: sampleCustomerIds[7], email: "frank.adams@example.com", contactNumber: 8901234567, inquiryCategory: "Games", inquiryMessage: "Report a bug in the game." },
            { userName: sampleCustomerIds[8], email: "grace.miller@example.com", contactNumber: 9012345678, inquiryCategory: "Movies", inquiryMessage: "Question about movie rentals." },
            { userName: sampleCustomerIds[9], email: "henry.wilson@example.com", contactNumber: 1234567890, inquiryCategory: "Food", inquiryMessage: "Inquire about catering services." },
        ];

        // Insert the inquiries into the database
        await Inquiry.insertMany(inquiries);
        console.log("Data inserted successfully");

    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        // Disconnect from MongoDB
        mongoose.connection.close();
    }
}

populateData();
