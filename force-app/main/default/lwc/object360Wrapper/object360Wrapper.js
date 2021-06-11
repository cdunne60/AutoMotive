import { LightningElement,api,track,wire } from 'lwc';
import getUserInfo from "@salesforce/apex/objectInfoController.getUserInfo";
export default class Object360Wrapper extends LightningElement {
    @api object = "";
    
    @track metric2Value;



    @track backgroundImage = "";
    @track nameLabel = "";
    @track userAvatar ="";
    @track userType = "";
    @track recordId = "";
    @track metric1 = "";
    @track metric1Icon = "";
    @track metric1Measure = "";
    @track metric1IconSize = "" ;
    @track metric2 = "";
    @track metric2Icon = "";
    @track metric2Measure = "";
    @track metric2IconSize = "" ;
    @track metric3 = "";
    @track metric3Icon = "";
    @track metric3Measure = "";
    @track metric3IconSize = "" ;
    @track metric4 = "";
    @track metric4Icon = "";
    @track metric4Measure = "";
    @track metric4IconSize = "" ;
    @track metric5 = "";
    @track metric5Icon = "";
    @track metric5Measure = "";
    @track metric5IconSize = "" ;
    @track metric6 = "";
    @track metric6Icon = "";
    @track metric6Measure = "";
    @track metric6IconSize = "" ;
    @track isLoading = true;
    @track userRecord = {};
    @track myerror;
    errormessage;


    @api metric2 = "";
    @api metric2Icon = "";
    @api metric2FieldName = "";
    @api metric2IconSize = "" ;

get soqlFields(){
  let fieldString = 'Id';

  if(this.field1Name !== undefined){
    fieldString+= ',' + this.field1Name;
  }

  if(this.metric2FieldName !== undefined && this.metric2FieldName !== ""){
    fieldString+= ',' + this.metric2FieldName;
  }

  if(this.field3Name !== undefined){
    fieldString+= ',' + this.field3Name;
  }

  if(this.field4Name !== undefined){
    fieldString+= ',' + this.field4Name;
  }

  if(this.field5Name !== undefined){
    fieldString+= ',' + this.field5Name;
  }

  if(this.field6Name !== undefined){
    fieldString+= ',' + this.field6Name;
  }

  return fieldString; 'Id,Name,Dog__c'
}

//Field mapping based on design attribute selected
get mileage(){
    if(this.metric1Measure == "Mileage"){
        return "Mileage__c";
    }
}
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
    currentRecordId: "$recordId"
  })
  wiredRecords(result) {
    this.errormessage = "";
    this.wiredRecordsResult = result;
    if (result.error) {
      console.error(result.error);
      this.errormessage = result.error.body.message;
      this.myerror = result.error;
    } else if (result.data) {


      if(this.metric2FieldName !== undefined){
        this.metric2Value = record[this.metric2FieldName];
      }

      this.userRecord.fullName = this.ref(result.data, this.userName);
      //add if statement copy 71 
      this.userRecord.MediumPhotoUrl = this.ref(result.data, this.userImage);
      this.userRecord.SmallPhotoUrl = this.ref(result.data, this.userSmallImage);
    }
  }
  //splits object from object name to name that we can reference
  ref(obj, str) {
    return str.split(".").reduce(function (o, x) {
      return o[x];
    }, obj);
  }
}