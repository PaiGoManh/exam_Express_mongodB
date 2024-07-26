const express = require('express');
const router = express.Router();
const Application = require('../Model/jobSchema');
const verifyToken = require('../Middelware/token');

router.post('/applications', verifyToken('User'), async (req, res) => {
    try {
        const newApplication = new Application(req.body);
        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(400).json({ error: 'Error creating application' });
    }
});

router.get('/applications', verifyToken('HR'), async (req, res) => {
    try {
        const { jobPosition } = req.query;
        const filter = jobPosition ? { jobPosition } : {};
        const applications = await Application.find(filter);
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching applications' });
    }
});

router.get('/applications/:id', verifyToken('HR'), async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching application' });
    }
});

router.put('/applications/:id/status', verifyToken('HR'), async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ error: 'Error updating status' });
    }
});

router.delete('/applications/:id', verifyToken('HR'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Application.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting application' });
    }
});

module.exports = router;
