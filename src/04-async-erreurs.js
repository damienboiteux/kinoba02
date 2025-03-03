class PaymentError extends Error {
    constructor(code, message) {
        super(message);
        this.name = "PaymentError";
        this.code = code;
        const codeMessages = {
            "insufficient_funds": "Insufficient funds",
            "invalid_amount": "Invalid amount",
            "invalid_card": "Invalid card",
            "expired_card": "Expired card",
        };
        this.userMessage = codeMessages[code];
    }
}

async function makePayment(amount) {
    const avaliableAmount = 100;
    if (amount > avaliableAmount) {
        throw new PaymentError("insufficient_funds", "Payment failed: Insufficient funds"); 
    } 
    return "Payment successful";
}

try {
    await makePayment(200);
} catch (error) {
    if(error instanceof PaymentError){
        alert(error.userMessage);
        console.log(error.message);
    }
    if( error instanceof Error){
    console.log(error.message);
    console.log(error.name);
    }
}