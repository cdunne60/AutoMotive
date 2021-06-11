import { LightningElement,api,track,wire } from 'lwc';
import getUserInfo from "@salesforce/apex/objectInfoController.getUserInfo";
export default class Object360Wrapper extends LightningElement {
    @api object = "";
    @api recordId = "02i090000011ihQAAQ";
    
    @track metric1Value;
    @track metric2Value;
    @track metric3Value;
    @track metric4Value;
    @track metric5Value;
    @track metric6Value;
  
    @api backgroundImage = "";
    @api nameLabel = "";
    @api userAvatar ="";
    @api userType = "";
  
    
    @api metric1 = "";
    @api metric1Icon = "";
    @api metric1FieldName = "";
    @api metric1IconSize = "" ;
    
    @api metric2 = "";
    @api metric2Icon = "";
    @api metric2FieldName = "";
    @api metric2IconSize = "" ;
    
    @api metric3 = "";
    @api metric3Icon = "";
    @api metric3FieldName = "";
    @api metric3IconSize = "" ;
   
    @api metric4 = "";
    @api metric4Icon = "";
    @api metric4FieldName = "";
    @api metric4IconSize = "" ;
    
    @api metric5 = "";
    @api metric5Icon = "";
    @api metric5FieldName = "";
    @api metric5IconSize = "" ;
    
    @api metric6 = "";
    @api metric6Icon = "";
    @api metric6FieldName = "";
    @api metric6IconSize = "" ;

    //@api isLoading = true;
    @api userRecord = {};
    @api myerror;
    errormessage;




get soqlFields(){
  let fieldString = 'Id';

  if(this.metric1FieldName !== undefined && this.metric1FieldName !== ""){
    fieldString+= ',' + this.metric1FieldName;
  }

  if(this.metric2FieldName !== undefined && this.metric2FieldName !== ""){
    fieldString+= ',' + this.metric2FieldName;
  }

  if(this.metric3FieldName !== undefined){
    fieldString+= ',' + this.metric3FieldName && this.metric3FieldName !== "";
  }

  if(this.metric4FieldName !== undefined){
    fieldString+= ',' + this.metric4FieldName && this.metric4FieldName !== "";
  }

  if(this.metric5FieldName !== undefined){
    fieldString+= ',' + this.metric5FieldName && this.metric5FieldName !== "";
  }

  if(this.metric6FieldName !== undefined){
    fieldString+= ',' + this.metric6FieldName && this.metric6FieldName !== "";
  }

  return fieldString; 
}

//Field mapping based on design attribute selected

get userName() {
    if (this.userType == "Creator") {
      return "CreatedBy.Name";
    } else if (this.userType == "Owner") {
      return "Owner.Name";
    } else {
      return this.userType + '.Name';
    }
  }
  //Field mapping based on design attribute selected
  get userImage() {
    if (this.userType == "Creator") {
      return "CreatedBy.MediumPhotoUrl";
    } else if (this.userType == "Owner") {
      return "Owner.MediumPhotoUrl";
    } else {
      return this.userType + '.MediumPhotoUrl'
    }
  }
  //Field mapping based on design attribute selected
  get userSmallImage() {
    if (this.userType == "Creator") {
      return "CreatedBy.SmallPhotoUrl";
    } else if (this.userType == "Owner") {
      return "Owner.SmallPhotoUrl";
    } else {
      return this.userType + '.SmallPhotoUrl'
    }
  }
  @wire(getUserInfo, {
    objApiName: "$object",
    fields: "$soqlFields",
    currentRecordId: "02i090000011ihQAAQ"
  })
  
  wiredRecords(result) {
    console.log("Test");
    this.errormessage = "";
    this.wiredRecordsResult = result;
    
    if (result.error) {
      console.error(result.error);
      this.errormessage = result.error.body.message;
      this.myerror = result.error;
    } else if (result.data) {


      if(this.metric1FieldName !== undefined){
        this.metric1Value = record[this.metric1FieldName];
      }
      console.log(this.metric1Value);

      if(this.metric2FieldName !== undefined){
        this.metric2Value = record[this.metric2FieldName];
      }
      console.log(this.metric2Value);

      if(this.metric3FieldName !== undefined){
        this.metric3Value = record[this.metric3FieldName];
      }
      if(this.metric4FieldName !== undefined){
        this.metric4Value = record[this.metric4FieldName];
      }
      if(this.metric5FieldName !== undefined){
        this.metric5Value = record[this.metric5FieldName];
      }
      if(this.metric6FieldName !== undefined){
        this.metric6Value = record[this.metric6FieldName];
      }
      this.userRecord.fullName = this.ref(result.data, this.userName);
      this.userRecord.MediumPhotoUrl = this.ref(result.data, this.userImage);
      this.userRecord.SmallPhotoUrl = this.ref(result.data, this.userSmallImage);
    }
    console.log("recordId:"+ this.currentRecordId);
  }
  //splits object from object name to name that we can reference
  ref(obj, str) {
    return str.split(".").reduce(function (o, x) {
      return o[x];
    }, obj);
  }
}