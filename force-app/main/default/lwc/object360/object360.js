import { LightningElement, api, wire,track } from 'lwc';

export default class Object360 extends LightningElement {
  @api recordId = "";
  @api object = "";

  @api backgroundImage = "";
  @api userAvatar ="";
  @api name="";
  @api nameLabel="";
  @api userType = "";
  @api metric1 = "";
  @api metric1Icon = "";
  @api metric1Measure = "";
  @api metric1IconSize = "" ;


  @api metric2 = "";
  @api metric2Icon = "";
  @api metric2Measure = "";
  @api metric2IconSize = "" ;


  @api metric3 = "";
  @api metric3Icon = "";
  @api metric3Measure = "";
  @api metric3IconSize = "" ;

  @api metric4 = "";
  @api metric4Icon = "";
  @api metric4Measure = "";
  @api metric4IconSize = "" ;

  @api metric5 = "";
  @api metric5Icon = "";
  @api metric5Measure = "";
  @api metric5IconSize = "" ;

  @api metric6 = "";
  @api metric6Icon = "";
  @api metric6Measure = "";
  @api metric6IconSize = "" ;
  
}