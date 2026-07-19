const whatsappButton=document.querySelector('.whatsapp-float');
if(whatsappButton&&!whatsappButton.querySelector('.whatsapp-logo')){
  const whatsappLogo=document.createElement('img');
  whatsappLogo.className='whatsapp-logo';
  whatsappLogo.src='assets/whatsapp-mark.png';
  whatsappLogo.alt='';
  whatsappLogo.setAttribute('aria-hidden','true');
  whatsappButton.append(whatsappLogo);
}
