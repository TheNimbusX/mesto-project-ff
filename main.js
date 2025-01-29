(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"67dedd4f-2aab-47ae-9594-fab41227b68c","Content-Type":"application/json"}};function o(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var c=function(e,t,n,c,a){var i=document.querySelector("#card-template").content.cloneNode(!0),u=i.querySelector(".card__image"),l=i.querySelector(".card__title"),s=i.querySelector(".card__like-button"),d=i.querySelector(".card__delete-button"),f=i.querySelector(".card__like-counter"),p=i.querySelector(".card__like");return u.src=e.link,u.alt=e.name,l.textContent=e.name,f.textContent=e.likes.length,u.addEventListener("click",c),e.owner._id===a?d.addEventListener("click",(function(){var n;(n=e._id,fetch("".concat(r.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:r.headers}).then((function(e){if(!e.ok)return Promise.reject("Ошибка: ".concat(e.status))}))).then(t(d)).catch((function(e){return console.log(e)}))})):d.remove(),e.likes.some((function(e){return e._id===a}))&&i.querySelector(".card__like-button").classList.add("card__like-button_is-active"),i.querySelector(".card__like-counter").textContent=e.likes.length,s.addEventListener("click",(function(t){var c;t.target.classList.contains("card__like-button")&&(t.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(o)}(e._id).then((function(e){n(t),p.querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){console.log(e)})):(c=e._id,fetch("".concat(r.baseUrl,"/cards/likes/").concat(c),{method:"PUT",headers:r.headers}).then(o)).then((function(e){n(t),p.querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){console.log(e)})))})),i};function a(e){e.target.classList.toggle("card__like-button_is-active")}function i(e){e.closest(".places__item").remove()}var u=function(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(t,e,n)})),l(t,n,r)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input_error_active"},p=document.querySelector(".content").querySelector(".places__list"),m=document.querySelectorAll(".popup"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_new-card"),v=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_image"),S=b.querySelector(".popup__image"),g=b.querySelector(".popup__caption"),k=document.forms["edit-profile"],C=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),E=document.querySelector(".profile__image"),L=document.querySelector(".popup_type_edit-avatar"),x=L.querySelector(".popup__form"),A=document.forms["new-place"];function T(t){S.src=t.srcElement.currentSrc,S.alt=t.srcElement.alt,g.textContent=t.srcElement.alt,e(b)}A.elements["place-name"],A.elements.link,m.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",(function(n){n.target.classList.contains("popup_is-opened")&&t(e),n.target.classList.contains("popup__close")&&t(e)}))})),y.addEventListener("click",(function(){k.elements.name.value=C.textContent,k.elements.description.value=q.textContent,e(_),s(k,f)})),k.addEventListener("submit",(function(e){e.preventDefault(),function(e){return fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:e.elements.name.value,about:e.elements.description.value})}).then(o)}(k).then((function(){C.textContent=k.elements.name.value,q.textContent=k.elements.description.value,t(_),e.submitter.textContent="Сохранение ..."})).catch((function(e){console.log(e)})).finally((function(){setTimeout((function(){e.submitter.textContent="Сохранить"}),800)}))})),v.addEventListener("click",(function(){e(h),s(A,f)})),A.addEventListener("submit",(function(e){e.preventDefault(),function(e){return fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:e.elements["place-name"].value,link:e.elements.link.value})}).then(o)}(A).then((function(n){p.prepend(c(n,i,a,T,n.owner._id)),t(h),e.target.reset(),e.submitter.textContent="Сохранение ..."})).catch((function(e){console.log(e)})).finally((function(){setTimeout((function(){e.submitter.textContent="Сохранить"}),400)}))})),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then(o)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],u=r[1];C.textContent=o.name,q.textContent=o.about,E.style.backgroundImage="url(".concat(o.avatar,")"),u.forEach((function(e){var t=c(e,i,a,T,o._id);p.append(t)}))})).catch((function(e){console.log(e)})),E.addEventListener("click",(function(){e(L),x.elements.avatar.value=E.style.backgroundImage.slice(4,-1).replace(/["']/g,""),s(x,f)})),x.addEventListener("submit",(function(e){e.preventDefault(),E.style.backgroundImage="url(".concat(x.elements.avatar.value,")"),function(e){return fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e.elements.avatar.value})}).then(o)}(x).then((function(){e.submitter.textContent="Сохранение ...",t(L),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){setTimeout((function(){e.submitter.textContent="Сохранить"}),400)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(t,n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?u(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.classList.add(e.errorClass),o.textContent=r}(e,t,n,n.validationMessage)}(t,e,o),l(t,n,r)}))}))}(t,e)}))}(f)})();