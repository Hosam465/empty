export async function generateOrderPDF(company, email, items, eventDate, headcount) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFillColor(23, 23, 27);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(217, 164, 65);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SM EVENTS", 15, 25);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("EVENT PLAN SUMMARY", 140, 25);
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT DETAILS", 15, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    let cy = 60;
    doc.text(`Company: ${company}`, 15, cy); cy += 7;
    doc.text(`Contact Email: ${email}`, 15, cy); cy += 7;
    if (eventDate) { doc.text(`Preferred Event Date: ${eventDate}`, 15, cy); cy += 7; }
    if (headcount) { doc.text(`Expected Headcount: ${headcount}`, 15, cy); cy += 7; }
    doc.text(`Submitted: ${new Date().toLocaleDateString()}`, 15, cy); cy += 11;
    doc.setFillColor(240, 240, 240);
    doc.rect(15, cy, 180, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.text("Activity", 20, cy + 6);
    doc.text("Price (SAR)", 160, cy + 6);
    let y = cy + 18; let total = 0;
    doc.setFont("helvetica", "normal");
    items.forEach((item, idx) => {
        doc.text(`${idx + 1}. ${item.name}`, 20, y);
        doc.text(`${Number(item.price).toLocaleString()} SAR`, 160, y);
        total += item.price; y += 8;
    });
    doc.setLineWidth(0.5); doc.line(15, y + 2, 195, y + 2);
    y += 12; doc.setFont("helvetica", "bold"); doc.setFontSize(12);
    doc.text("TOTAL ESTIMATED COST:", 20, y); doc.text(`${total.toLocaleString()} SAR`, 160, y);
    y += 25; doc.setFillColor(248, 249, 250); doc.rect(15, y, 180, 45, 'F');
    doc.setFontSize(11); doc.setTextColor(23, 23, 27);
    doc.text("CONTACT US", 20, y + 10);
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(60, 60, 60);
    doc.text("Head of Operations: Salman Bin Mohammed", 20, y + 18);
    doc.text("Phone 1: +966 57 009 8994", 20, y + 25);
    doc.text("Phone 2: +966 57 069 7310", 20, y + 32);
    doc.text("Email: s.e-for-activities@outlook.com", 20, y + 39);
    doc.save(`SM_Events_Plan_${Date.now()}.pdf`);
}

export function sendWhatsAppInquiry(company, email, items, eventDate, headcount) {
    let msg = `*SM EVENTS - EVENT INQUIRY*\n\n`;
    msg += `*Company:* ${company}\n`;
    msg += `*Email:* ${email}\n`;
    if (eventDate) msg += `*Preferred Event Date:* ${eventDate}\n`;
    if (headcount) msg += `*Expected Headcount:* ${headcount}\n`;
    msg += `\n*Selected Activities (${items.length}):*\n`;
    items.forEach((item, idx) => msg += `${idx + 1}. ${item.name}\n`);
    msg += `\nPlease provide us with pricing and availability for these activities.`;
    window.open(`https://wa.me/966570098994?text=${encodeURIComponent(msg)}`, '_blank');
}
