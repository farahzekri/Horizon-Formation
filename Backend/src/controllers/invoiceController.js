const mongoose = require('mongoose');
const Student = require('../models/student');
const Invoice = require('../models/invoice');
const Formation = require('../models/formation');

const addInvoice = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;

        // Verify if the student exists and populate formationId within the formations array
        const student = await Student.findById(studentId).populate('enrollmentInfo.formationId');
       if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // console.log("student info :" , student)

        // Retrieve formation details
        const formations = student.enrollmentInfo.formationId;
        if (!formations || formations.length === 0) {
            return res.status(404).json({ message: 'No formations found for the student' });
        }

        // console.log("formations informations :" , formations)

        // Détails de la formation
        const amount = (formations.tuitionFee || 0) + (formations.registrationFee || 0);

        // Détails de la formation
        const formationDetails = [{
            formationId: formations._id,
            amount: amount
        }];

        // console.log("formation Details:" , formationDetails)

        // Calculez le montant total
        const totalAmount = formationDetails.reduce((sum, formation) => sum + formation.amount, 0);

        // Créez la nouvelle facture
        const newInvoice = new Invoice({
            studentId: new mongoose.Types.ObjectId(studentId),
            date,
            formations: formationDetails,
            totalAmount,
            status
        });
        await newInvoice.save();

        // Mettez à jour les informations de facturation de l'étudiant
        student.billingInfo.invoices.push({ invoiceId: newInvoice._id });
        await student.save();

        res.status(201).json(newInvoice);
    } catch (error) {
        console.error("Erreur lors de la création de la facture:", error);
        res.status(400).json({ message: error.message });
    }
};



const getInvoiceByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Trouver l'étudiant et récupérer l'ID de la facture
        const student = await Student.findById(studentId).populate('billingInfo.invoices.invoiceId');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Assurez-vous qu'il y a une facture associée
        const invoiceId = student.billingInfo.invoices[0]?.invoiceId;

        if (!invoiceId) {
            return res.status(404).json({ message: 'No invoice found for this student' });
        }

        // Récupérer la facture en peuplant les informations de l'étudiant et de la formation
        const invoice = await Invoice.findById(invoiceId)
            .populate({
                path: 'studentId',
                select: 'personalInfo enrollmentInfo',
                populate: {
                    path: 'enrollmentInfo.formationId',
                    select: 'tuitionFee registrationFee'
                }
            })
            .populate({
                path: 'formations.formationId',
                select: 'tuitionFee registrationFee'
            });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error("Erreur lors de la récupération de la facture:", error);
        res.status(400).json({ message: error.message });
    }
};



const updateInvoice = async (req, res) => {
    try {
        const { studentId } = req.params; // L'ID de l'étudiant
        const { date, status } = req.body;

        // Trouver l'étudiant et récupérer l'ID de la facture associée
        const student = await Student.findById(studentId).populate('billingInfo.invoices.invoiceId');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const invoice = student.billingInfo.invoices[0]?.invoiceId;

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found for this student' });
        }

        // Récupérer et mettre à jour les détails de la facture
        const invoiceDetails = await Invoice.findById(invoice._id)
            .populate('formations.formationId');

        if (!invoiceDetails) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Mettre à jour les détails de la facture si fournis
        if (date) invoiceDetails.date = date;
        if (status) invoiceDetails.status = status;

        // Recalculer les montants si nécessaire
        const updatedFormations = await Promise.all(invoiceDetails.formations.map(async (formation) => {
            const formationDetails = await Formation.findById(formation.formationId);
            if (formationDetails) {
                formation.amount = (formationDetails.tuitionFee || 0) + (formationDetails.registrationFee || 0);
            }
            return formation;
        }));

        invoiceDetails.formations = updatedFormations;
        invoiceDetails.totalAmount = updatedFormations.reduce((sum, formation) => sum + formation.amount, 0);

        await invoiceDetails.save();

        res.status(200).json(invoiceDetails);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la facture:", error);
        res.status(400).json({ message: error.message });
    }
};


module.exports = { 
    addInvoice ,
    getInvoiceByStudentId ,
    updateInvoice,
};
