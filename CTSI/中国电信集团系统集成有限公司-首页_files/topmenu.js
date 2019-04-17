function window_data()
{
 this.src="";
 this.src2="";
 this.src_ex="";
 this.wid="";
 this.imgid="";
 this.spanid="";
 this.id="";
}
function window_list()
{
 this.cid="";
 this.nid=0;
 this.wdata=new Array();
 this.c_n=0;
 this.addwindow=function(strid,src1,src2,wid,spanid)
 {
  this.wdata[this.nid]=new window_data();
  this.wdata[this.nid].id=strid;
  this.wdata[this.nid].src=src1;
  this.wdata[this.nid].src2=src2;
  this.wdata[this.nid].wid=wid;
  this.wdata[this.nid].spanid=spanid;
  this.nid++;
 }
 this.hidewindow=function()
 {
 	for(var i=0;i<this.wdata.length;i++)
 	{
 		document.getElementById(this.wdata[i].id).src=this.wdata[i].src2;
 		document.getElementById(this.wdata[i].wid).style.display="none";
 	}
 }
 this.chgwindow=function(strid)
 {
  
  if(strid!=this.cid)
  {
   this.cid=strid;
   var tt=-1;
   var obj1=null;
   var obj2=null;
   for(var i=0;i<this.wdata.length;i++)
   {
    if(this.cid==this.wdata[i].id)
    {
     //ÉèÖÃÍ¼Æ¬src(Ã÷)
     tt=i
     obj1=document.getElementById(this.wdata[i].id);
     obj1.src=this.wdata[i].src;
     if(this.wdata[i].wid!="null")
     {
     obj2=document.getElementById(this.wdata[i].wid);
     obj2.style.display="";
     //document.getElementById(this.wdata[i].spanid).className="seltitle_sel";
     }   
    }
    else
    {
     //ÉèÖÃÍ¼Æ¬src(»Ò)
     if(i==this.c_n)
     {
     document.getElementById(this.wdata[i].id).src=this.wdata[i].src2;
     if(this.wdata[i].wid!="null")
     {
     document.getElementById(this.wdata[i].wid).style.display="none";
     //document.getElementById(this.wdata[i].spanid).className="seltitle";
     } 
     }
    }
    
   }this.c_n=tt;
  }
 }
}
