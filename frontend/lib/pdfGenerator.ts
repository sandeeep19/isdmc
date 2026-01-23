import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF with autotable types
interface jsPDFWithPlugin extends jsPDF {
    autoTable: (options: any) => jsPDF;
}

export const generateItineraryPDF = (selections: {
    categories: string[];
    time: string;
    days: number;
}) => {
    const doc = new jsPDF() as jsPDFWithPlugin;
    const { categories, time, days } = selections;

    // Configuration
    const brandPrimary = '#1a365d'; // Deep Blue
    const brandAccent = '#c05621'; // Burnt Orange

    // Header
    doc.setFillColor(brandPrimary);
    doc.rect(0, 0, 210, 40, 'F');

    // Title (Bicolor effect)
    doc.setFont('merriweather', 'black');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('INDIAN', 20, 25);
    doc.setTextColor(255, 200, 100); // Accent color
    doc.text('STUDIO', 62, 25);

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('VARANASI | SEEN FROM INSIDE', 20, 32);

    // Itinerary Details
    doc.setTextColor(brandPrimary);
    doc.setFontSize(18);
    doc.text('Your Curated Path', 20, 55);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Duration: ${days} Days`, 20, 65);
    doc.text(`Theme: ${time === 'day' ? 'Daylight Discovery' : 'Night Mystique'}`, 80, 65);

    // Content Mapping
    const contentMap: Record<string, string[]> = {
        ghat: ['Morning Aarti at Dashashwamedh', 'Evening boat ride along all 84 ghats', 'Manikarnika ritual viewing'],
        food: ['Traditional Kachori Sabzi breakfast', 'Evening Tamatar Chaat trail', 'Blue Lassi specialty shop'],
        shop: ['Handloom Weavers Colony visit', 'Heritage Brassware artisan visit', 'Perfume (Itar) makers trail'],
        gems: ['The secret Lolark Kund', 'Hidden alleys of Chowk', 'The forgotten Sun temple']
    };

    let yPos = 80;

    // Day by Day Plan
    for (let i = 1; i <= days; i++) {
        if (yPos > 260) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFillColor(245, 245, 245);
        doc.rect(20, yPos, 170, 10, 'F');
        doc.setTextColor(brandAccent);
        doc.setFontSize(12);
        doc.text(`DAY ${i}: ${categories.map(c => c.toUpperCase()).join(' & ')}`, 25, yPos + 7);
        yPos += 20;

        categories.forEach(cat => {
            const items = contentMap[cat] || [];
            items.forEach(item => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setTextColor(brandPrimary);
                doc.text('•', 30, yPos);
                doc.setTextColor(50, 50, 50);
                doc.text(`${item} - Recommended for ${time}`, 38, yPos);
                yPos += 10;
            });
        });

        yPos += 10;
    }

    // Footer Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const footerText = 'This is a curated suggestion based on your interests. For full bookings and professional guides, please contact hello@indianstudiodmc.com';
    doc.text(footerText, 20, 285);

    // Save PDF
    doc.save(`Kashi_Itinerary_${Date.now()}.pdf`);
};
