export const convertCurrency = async (
    amount: number,
    from: "GEL" | "USD",
    to: "GEL" | "USD"
): Promise<number | null> => {
    const url = `https://bankofgeorgia.ge/api/currencies/convert/${from}/${to}?amountFrom=${amount}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data.data.amount;
    } catch (error) {
        console.error("Error converting currency:", error);
        return null;
    }
};
