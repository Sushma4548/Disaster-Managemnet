const express = require("express");
const router = express.Router();
// Load User model
const Incidents = require("../model/Incidents");
const IncidentAsignee = require("../model/IncidentAsignee");
const Resource = require("../model/resource");
const getIncidents = (req, res) => {
    Incidents.find({ status: req.query.status })
      .then(incidents => res.json(incidents))
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getIncidents = getIncidents

const userdata=(req,res) =>{
    if (req.user){
        return res.status(200).json(req.user);
    }
}
module.exports.userdata=userdata

const getMyIncidents = (req, res) => {
    IncidentAsignee.find({ AssignedTo:req.user.email })
      .then(assignedIncidents => {
        const incidentIdList=assignedIncidents.map(a => a.IncidentId);
        Incidents.find({incidentId:{$in:incidentIdList}})
        .then(incidents=>res.json(incidents))
        .catch(err=>res.status(400).json('Error: '+err))
    }
        )
      .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.getMyIncidents = getMyIncidents

const createIncident = (req, res) => {
    Incidents.findOne({ incidentName: req.body.incidentName }).then(incident => {
        if (incident) {
            return res.status(400).json({ email: "Incident already exists" });
        } else {
            const newIncident = new Incidents({
                // incidentId: Incidents.nextCount(function(err,count){
                //     return count;
                // }),
                incidentName: req.body.incidentName,
                address: req.body.address,
                dateAndTime: req.body.dateAndTime,
                description: req.body.description,
                status: "open",
                lat: req.body.lat,
                lng: req.body.lng
            });
            newIncident
                .save()
                .then(incident => res.json(incident))
                .catch(err => console.log(err));
        }
    });
};

module.exports.createIncident = createIncident

const closeIncident = (req, res) => {
    console.log(req.body.params)
    Incidents.findOneAndUpdate({
        incidentId:req.body.params.incidentId
    }, 
    {
        $set:{
           status:'closed'
        }
    },
     (error, incident)=>{
    if(error){
        return res.json({code: 400, message:'Something went wrong'})
    }
    if(incident){
        return res.json({code: 200, message:'Incident closed.'})
    }else{
        return res.json({code: 404, message:'Something went wrong.'})
    }})
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.closeIncident = closeIncident

const editIncident = (req, res) => {
    console.log('entered')
    Incidents.findOneAndUpdate({
        incidentId:req.body.incidentId
    }, 
    {
        $set:{
            incidentName: req.body.incidentName,
            address: req.body.address,
            dateAndTime: req.body.dateAndTime,
            description: req.body.description,  
        }
    },
     (error, incident)=>{
    if(error){
        return res.json({code: 400, message:'Something went wrong'})
    }
    if(incident){
        return res.json({code: 200, message:'Incident edited.'})
    }else{
        return res.json({code: 404, message:'Something went wrong.'})
    }})
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports.editIncident = editIncident


const assignResourceToIncident = (req, res) => {
    Incidents.findOneAndUpdate({
        incidentId:req.body.incidentId
    }, 
    {
        $push:{
            technicalResources: req.body.resources
        }
    },
     (error, incident)=>{
    if(error){
        return res.json({code: 400, message:'Something went wrong'})
    }
    if(incident){
        req.body.resources.forEach(element => {
            Resource.findOneAndUpdate({
                _id:element
            }, 
            {
                $set:{
                    status: 'Assigned'
                }
            },
             (error, incident)=>{
            if(error){
                return res.json({code: 400, message:'Something went wrong'})
            }
            if(incident){
               console.log('edited')
            }else{
                console.log('edited')
            }})
            .catch(err => res.status(400).json('Error: ' + err)); 
        });
    
        return res.json({code: 200, message:'Incident edited.'})
    }else{
        res.status(400).json('Error: ' + err)
    }})
    .catch(err => res.status(400).json('Error: ' + err));

};

module.exports.assignResourceToIncident = assignResourceToIncident