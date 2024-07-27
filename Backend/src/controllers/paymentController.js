const Student = require('../models/student');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const Payment = require('../models/payment');


const addPayment = async (req, res) => {
    try {
        const { studentId, amount, date, method } = req.body;

        // Vérifier si l'étudiant existe
        const student = await Student.findById(studentId).populate('billingInfo.invoices.invoiceId');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Assurez-vous que l'étudiant a une facture associée
        const invoice = student.billingInfo.invoices[0]?.invoiceId;

        if (!invoice) {
            return res.status(404).json({ message: 'No invoice found for this student' });
        }

        // Créer le nouveau paiement
        const newPayment = new Payment({
            studentId: student._id,
            invoiceId: invoice._id,
            amount,
            date,
            method
        });

        // Initialiser le reçu avec le numéro de reçu, le montant et la méthode
        await newPayment.initializeReceipt();

        // Sauvegarder le paiement avec le reçu généré
        await newPayment.save();

        // Assurez-vous que paymentInfo existe et est initialisé
        if (!student.billingInfo.payments) {
            student.billingInfo.payments = [];
        }

        // Mettre à jour les informations de paiement de l'étudiant
        student.billingInfo.payments.push({ paymentId: newPayment._id });
        await student.save();

        res.status(201).json(newPayment);
    } catch (error) {
        console.error("Error adding payment:", error);
        res.status(400).json({ message: error.message });
    }
};




const updateReceipt = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const { issuer } = req.body;

        // Trouver le paiement par ID
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Mettre à jour les détails du reçu
        payment.updateReceiptDetails(issuer);

        // Sauvegarder les modifications
        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error updating receipt:", error);
        res.status(400).json({ message: error.message });
    }
};

const getPaymentsByStudentId = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Vérifier si l'étudiant existe
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Récupérer les paiements associés à l'étudiant
        const payments = await Payment.find({ studentId });

        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this student' });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error("Error retrieving payments:", error);
        res.status(400).json({ message: error.message });
    }
};


const exportReceiptAsPDF = async (req, res) => {
    try {
        const paymentId = req.params.paymentId;

        // Trouver le paiement par ID
        const payment = await Payment.findById(paymentId).populate('studentId');

        if (!payment) {
            return res.status(404).json({ message: 'Paiement non trouvé' });
        }

        // Trouver l'étudiant par ID
        const student = await Student.findById(payment.studentId._id);

        if (!student) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }

        // Créer un nouveau document PDF
        const doc = new PDFDocument({ margin: 50 });

        // Définir les en-têtes pour le téléchargement du fichier
        res.setHeader('Content-disposition', `attachment; filename=recu_${paymentId}.pdf`);
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF into a writable stream
        doc.pipe(res);

        // Ajouter du contenu au PDF
        doc.fontSize(16).text('Reçu de paiement', { align: 'center' });
        doc.moveDown();

        // Format de la date d'émission
        const formatDate = (date) => {
            if (!date) return 'N/A';
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        };

        // Format de la date de paiement pour afficher seulement jour/mois/année
        const formatPaymentDate = (date) => {
            if (!date) return 'N/A';
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        };

        // Ajouter le texte avec partie avant les deux-points en gras
        doc.font('Helvetica-Bold').fontSize(12).text(`Numéro du reçu :`, { continued: true });
        doc.font('Helvetica').text(` ${payment.receipt?.receiptNumber || 'N/A'}`);
        
        doc.font('Helvetica-Bold').text(`Date d'émission :`, { continued: true });
        doc.font('Helvetica').text(` ${formatDate(payment.receipt?.dateIssued)}`);
        
        doc.font('Helvetica-Bold').text(`Émetteur :`, { continued: true });
        doc.font('Helvetica').text(` ${payment.receipt?.issuer || 'N/A'}`);
        
        doc.font('Helvetica-Bold').text(`Montant :`, { continued: true });
        doc.font('Helvetica').text(` TND ${payment.amount}`);
        
        doc.font('Helvetica-Bold').text(`Méthode de paiement :`, { continued: true });
        doc.font('Helvetica').text(` ${payment.method}`);
        
        doc.font('Helvetica-Bold').text(`Date de paiement :`, { continued: true });
        doc.font('Helvetica').text(` ${formatPaymentDate(payment.date)}`);
        
        doc.font('Helvetica-Bold').text(`Nom de l’étudiant :`, { continued: true });
        doc.font('Helvetica').text(` ${student.personalInfo?.lastName || 'N/A'} ${student.personalInfo?.firstName || 'N/A'}`);
        
        doc.moveDown();

        // Ajouter le nom de l'entreprise en bas de la page en gras
        doc.font('Helvetica-Bold').fontSize(10).text('HORIZON', { align: 'center' });

        doc.end();
    } catch (error) {
        console.error("Erreur lors de l'exportation du reçu en PDF :", error);
        res.status(400).json({ message: error.message });
    }
};



module.exports = { 
    addPayment,
    updateReceipt ,
    getPaymentsByStudentId,
    exportReceiptAsPDF,
 };
