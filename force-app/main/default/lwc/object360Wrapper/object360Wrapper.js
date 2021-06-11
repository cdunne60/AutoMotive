import { LightningElement,api,track,wire } from 'lwc';
import getUserInfo from "@salesforce/apex/objectInfoController.getUserInfo";
export default class Object360Wrapper extends LightningElement {
    @api object = "";
    @api recordId = "";
    
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
  
    
    @api metric1 ;
    @api metric1Icon = "";
    @api metric1FieldName ;
    @api metric1IconSize = "" ;
    
    @api metric2 ;
    @api metric2Icon = "";
    @api metric2FieldName;
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
    fieldString+= ' ,' + this.metric1FieldName;
  }

  if(this.metric2FieldName !== undefined && this.metric2FieldName !== ""){
    fieldString+= ' ,' + this.metric2FieldName;
  }


  if(this.metric3FieldName !== undefined && this.metric3FieldName !== ""){
    fieldString+= ' ,' + this.metric3FieldName ;
  }

  if(this.metric4FieldName !== undefined && this.metric4FieldName !== ""){
    fieldString+= ' ,' + this.metric4FieldName ;
  }

  if(this.metric5FieldName !== undefined && this.metric5FieldName !== ""){
    fieldString+= ' ,' + this.metric5FieldName ;
  }

  if(this.metric6FieldName !== undefined  && this.metric6FieldName !== ""){
    fieldString+= ' ,' + this.metric6FieldName ;
  }

  return fieldString; 
}


  @wire(getUserInfo, {
    objApiName: "$object",
    fields: "$soqlFields",
    currentRecordId: "$recordId"
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
      console.log(result.data);

      if(this.metric1FieldName !== undefined ){
        this.metric1Value = result.data[this.metric1FieldName];
      }
      console.log(this.metric1Value);

      if(this.metric2FieldName !== undefined ){
        this.metric2Value = result.data[this.metric2FieldName];
      }

  
      if(this.metric3FieldName !== undefined && this.metric3FieldName !== ""){
        this.metric3Value = result.data[this.metric3FieldName];
      }
      if(this.metric4FieldName !== undefined  && this.metric4FieldName !== ""){
        this.metric4Value = result.data[this.metric4FieldName];
      }
      if(this.metric5FieldName !== undefined && this.metric5FieldName !== ""){
        this.metric5Value = result.data[this.metric5FieldName];
      }
      if(this.metric6FieldName !== undefined && this.metric6FieldName !== ""){
        this.metric6Value = result.data[this.metric6FieldName];
      }
    
    }
    console.log("recordId:"+ this.recordId);
  }
}