
document.addEventListener("DOMContentLoaded",()=>{
  const burger=document.querySelector(".burger");
  const nav=document.querySelector(".nav-links");
  burger?.addEventListener("click",()=>nav?.classList.toggle("open"));
  const drop=document.querySelector(".nav-drop");
  const dropBtn=document.querySelector(".nav-drop-btn");
  dropBtn?.addEventListener("click",()=>{drop?.classList.toggle("open");dropBtn.setAttribute("aria-expanded",drop?.classList.contains("open")?"true":"false")});

  const params=new URLSearchParams(location.search);
  const project=params.get("projet");
  const select=document.querySelector("#project");
  if(project&&select){
    const map={site:"site",seo:"seo",geo:"geo",audit:"audit"};
    if(map[project]) select.value=map[project];
  }
  const source=document.querySelector("#source_page");
  if(source) source.value=location.href;

  document.querySelectorAll("form[data-contact-form]").forEach(form=>{
    form.addEventListener("submit",async e=>{
      e.preventDefault();
      const status=form.querySelector(".form-status");
      const btn=form.querySelector('button[type="submit"]');
      if(status) status.textContent="Envoi en cours…";
      if(btn) btn.disabled=true;
      try{
        const res=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
        if(!res.ok) throw new Error("send");
        if(status) status.textContent="Merci. Votre demande a bien été envoyée.";
        if(typeof window.gtag==="function"){
          window.gtag("event","generate_lead",{lead_source:"contact_form",project_type:form.querySelector('[name="project"]')?.value||"unknown"});
          window.gtag("event","conversion",{send_to:"AW-18388328221/YxnjCKaMqfQcEJ2-nsBE"});
        }
        form.reset();
      }catch(err){
        if(status) status.textContent="L’envoi a échoué. Réessayez dans quelques instants.";
      }finally{
        if(btn) btn.disabled=false;
      }
    });
  });
});
