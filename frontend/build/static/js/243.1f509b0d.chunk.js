"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[243],{9243:function(e,s,n){n.r(s),n.d(s,{default:function(){return H}});var t=n(2791),a=n(4165),i=n(3433),r=n(5861),c=n(9439),o=n(1243),l=n(5218),d="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANFSURBVHgBvZjdceIwEMeF42TymKvgfJPA8AZXwZkKwlWQdHCXChI6SCoIqSCkAnwdmBeGAR58HfDIN/f/+yQjHBnbfO2Mw0aSpZ92V9LKBXEicRznyrbt6tnZWXW5XFYKhYLLYjwB/m/O5/OXIAhGBXEkKRaLVcuy3NjgibJarfzZbFY7CBBm75yfn7tQq3gIwN8rkV8auYFoepjd5ex3GLyDx8e7HixXh34bqw9skTJ4gt9TBW3/wg0efn0+4/HYZ4yw7ubm5hFQt6YhP1kIjV10cJdncMgI7f8wDqD70+nUU4Mb+ifMk1bUwlOX+tpC5XLZWSwWrxIkbfAOLObDcgTwer1eIDKIAaaBSQToTwF1bAWDAdqocAz9RH7H43e7XV/sICaYfr//VCqVmqoADF4IBMu86zCgfsHsW7rf95EkGKlXVCHi1bexX9zLlRIKXqzBBZ44kKTAUKKxaQBL8x8t83xKGC4grS70hgXlh1b4Jk4EQ+F2onS5QgWBok1tMBjsFLC7wEgIV9M7CigKWm6E4kQwUr4qBaHjhUDKVJSLi4vf4kQwcvKRy5R38L71oQoB94sHpTgyDIVHktK5yyvdmkwmTfwGsuIKVmrnhcoLEw78/3AOhbt+VM6lBsv8FOtYcvJA7QJDwZjR6lbxEwLxD/2HBrW8ULvCSAh9yQcbQElQSLpexRFgeHYKud1gzJG+3Vh6Qw1KzcI1bQX7wFAQM/pR1dHrrHhjSRsRX15eVg8JQ4ltiN5WINkoa3KVG0ZKRdP9VKAjw2wENLNLkRfokDC8Hon1+RnE8y07rQMkb4/6JrYPjBQ9JjvxylQLxXLsfWE2gJiyxiuTLERyVy/Ay7wdeHpShetv7hQXE4x2aKasn+pNL3FQuKktskkLgfnAYMjSGEn9Sul470t8QkaXDYdD3iwfRDapZz37TClrvE1iDAHqGVb6BvWN6YHp0ZpnOvvQ373S9TxMl70+NnAJA4yujZYx3FAzue/6+rqOHPpdgzPebvb++mGCwuwb+LTC63RAqyF472L72AdWa93U30E+xxigtkmiFSmZj45twgMZFvguZOaZJIy7bTBhG3Fg4U2YwQu38QClxUZyEWS6hP4D64bze+fQEL8AAAAASUVORK5CYII=",h=(n(1608),n(2756)),x=n(7047),u=n(7200),m=n(184);var g=function(){var e=(0,t.useRef)(null),s=(0,t.useContext)(h.Z),n=s.user,a=s.isSameUser,i=s.isTyping,r=s.messages,c=s.loading;return s.setLoading,(0,t.useEffect)((function(){!function(){var s;null===(s=e.current)||void 0===s||s.scrollIntoView({behavior:"smooth"})}(),console.log("typing")}),[r,i]),(0,m.jsx)("div",{className:"message-container",children:(0,m.jsxs)("ul",{id:"messages",children:[c&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("li",{className:"message-box sender ",style:{minWidth:"20%"},children:(0,m.jsx)("span",{children:(0,m.jsx)(x.Z,{variant:"text",sx:{fontSize:"1rem"}})})}),(0,m.jsx)("li",{className:"message-box receiver",style:{minWidth:"20%"},children:(0,m.jsx)("span",{children:(0,m.jsx)(x.Z,{variant:"text",sx:{fontSize:"1rem"}})})})]}),!c&&r&&r.map((function(e,s){return(0,m.jsxs)("li",{className:"message-box ".concat(e.sender._id===n._id?"sender":"receiver"," ").concat(a(r,e,s)?"margin-2":"margin-10"),children:[(0,m.jsx)("span",{children:e.message}),(0,m.jsx)("span",{className:"time-stamp",children:(0,u.Z)(new Date(e.createdAt),{addSuffix:!0})})]},s)})),i&&(0,m.jsx)("li",{className:"message-box reciever",children:(0,m.jsx)("div",{class:"typingIndicatorContainer",children:(0,m.jsxs)("div",{class:"typingIndicatorBubble",children:[(0,m.jsx)("div",{class:"typingIndicatorBubbleDot"}),(0,m.jsx)("div",{class:"typingIndicatorBubbleDot"}),(0,m.jsx)("div",{class:"typingIndicatorBubbleDot"})]})})}),(0,m.jsx)("div",{ref:e})]})})};var p=function(e){e.username,e.setUsername,e.room,e.setRoom;var s=(0,t.useState)(""),n=(0,c.Z)(s,2),x=n[0],u=n[1],p=(0,t.useContext)(h.Z),j=p.selectedChat,f=(p.fetchAgain,p.setFetchAgain,p.messages),v=p.setMessages,A=p.isSocketConnected,Z=p.isTyping,w=p.socket,b=p.user,C=(0,t.useState)(!1),N=(0,c.Z)(C,2),y=N[0],k=N[1],S=(0,t.useState)(),I=(0,c.Z)(S,2),B=I[0],Q=I[1],F=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(s){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),o.Z.post("".concat("https://car-selling-site.vercel.app/api/v1","/message"),{message:x,chatId:j._id},{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){u(""),v([].concat((0,i.Z)(f),[e.data.data])),w.emit("new-message",e.data.data)})).catch((function(e){l.Am.error("Cannot send the message")}));case 2:case"end":return e.stop()}}),e)})));return function(s){return e.apply(this,arguments)}}();return(0,t.useEffect)((function(){!function(){if(j)try{o.Z.get("".concat("https://car-selling-site.vercel.app/api/v1","/message/").concat(j._id),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){v(e.data.data),w.emit("join-chat",j._id)}))}catch(e){l.Am.error("".concat(e.response.data.message))}}()}),[j]),(0,m.jsx)(m.Fragment,{children:(0,m.jsx)(m.Fragment,{children:j?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"chat-topic-head",children:[(0,m.jsx)("p",{style:{textTransform:"capitalize"},children:j.chatName}),(0,m.jsxs)("span",{children:[j.users[0]._id===b._id?j.users[1].profile_name:j.users[0].profile_name," ","| Delhi, India"]})]}),(0,m.jsx)(g,{messages:f,isTyping:Z}),(0,m.jsxs)("form",{id:"form",action:"",onSubmit:F,className:"chat-box",children:[(0,m.jsx)("input",{id:"input",autocomplete:"off",value:x,placeholder:"Message...",className:"chat-box-input",onChange:function(e){var s;if(u(e.target.value),A){y||(k(!0),console.log("typing emitted"),w.emit("typing",j._id));var n=(new Date).getTime();B&&clearTimeout(B),s=setTimeout((function(){(new Date).getTime()-n>=3e3&&y&&(w.emit("stop-typing",j._id),k(!1))}),3e3),Q(s)}}}),(0,m.jsx)("button",{className:"send-btn",children:(0,m.jsx)("img",{src:d,alt:""})})]})]}):(0,m.jsx)("div",{className:"alternate-text-container",children:(0,m.jsx)("p",{className:"alternate-text",children:"Click On Chat Head to start conversation"})})})})},j=n(4942),f=n(1413),v=n(7630),A=n(3967),Z=n(1009),w=n(4390),b=n(3974),C=n(3044),N=n(3400),y=n(4721),k=n(493),S=n(5021),I=n(6278),B=n(7064),Q=n(158),F=(0,v.ZP)("div")((function(e){var s=e.theme;return(0,f.Z)({display:"flex",alignItems:"center",justifyContent:"flex-end",minHeight:"60px",color:"grey",padding:s.spacing(0,1)},s.mixins.toolbar)})),_=function(e){return(0,j.Z)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:"26%",top:"60px",paddingBottom:"60px",zIndex:0},e.breakpoints.up("sm"),{width:"calc(".concat(e.spacing(8)," + 1px)")})},D=function(e){return{width:240,top:"60px",zIndex:1,paddingBottom:"60px",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),overflowX:"hidden"}},L=(0,v.ZP)(b.ZP,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var s=e.theme,n=e.open;return(0,f.Z)((0,f.Z)({flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box",position:"relative",height:"100%",width:"100%"},n&&(0,f.Z)((0,f.Z)({},D(s)),{},{"& .MuiDrawer-paper":D(s)})),!n&&(0,f.Z)((0,f.Z)({},_(s)),{},{"& .MuiDrawer-paper":_(s)}))}));var E=function(){var e=(0,t.useState)(),s=(0,c.Z)(e,2),n=s[0],a=s[1],i=(0,t.useState)(),r=(0,c.Z)(i,2),d=r[0],u=r[1],g=(0,t.useContext)(h.Z),p=g.selectedChat,j=g.setSelectedChat,v=g.fetchAgain,b=g.loading,_=g.setLoading,D=((0,A.Z)(),(0,t.useState)(!1)),E=(0,c.Z)(D,2),H=E[0],K=E[1],R=function(e){return{sx:{width:70,height:70,fontSize:30,bgcolor:X(e),"@media (max-width: 460px)":{width:45,height:45,fontSize:20}},children:"".concat(e.charAt(0).toUpperCase())}},X=function(e){var s,n=0;for(s=0;s<e.length;s+=1)n=e.charCodeAt(s)+((n<<5)-n);var t="#";for(s=0;s<3;s+=1){t+="00".concat((n>>8*s&255).toString(16)).slice(-2)}return t};return(0,t.useEffect)((function(){console.log(p),localStorage.getItem("user")&&u(JSON.parse(localStorage.getItem("user"))),_(!0),o.Z.get("".concat("https://car-selling-site.vercel.app/api/v1","/chats"),{headers:{Authorization:"Bearer ".concat(localStorage.getItem("token"))}}).then((function(e){a(e.data.data),_(!1)})).catch((function(e){_(!1),l.Am.error("Cannot Fetch Chats")}))}),[v]),(0,m.jsxs)(m.Fragment,{children:[window.innerWidth>786&&(0,m.jsxs)("div",{children:[(0,m.jsx)("h3",{className:"chat-head-heading",children:"Messages"}),b&&(0,m.jsxs)("div",{className:"chat-head-container ",children:[(0,m.jsx)("div",{className:"user-avatar",children:(0,m.jsx)(x.Z,{variant:"circular",width:80,height:80})}),(0,m.jsxs)("div",{className:"user-details",style:{width:"100%"},children:[(0,m.jsx)("span",{className:"user-name",children:(0,m.jsx)(x.Z,{variant:"h4",sx:{width:"100%"}})}),(0,m.jsx)("span",{className:"spec-unit",children:(0,m.jsx)(x.Z,{variant:"text",sx:{width:"100%"}})}),(0,m.jsx)("p",{className:"last_message",children:(0,m.jsx)(x.Z,{variant:"text",sx:{width:"100%"}})})]})]}),!b&&(null===n||void 0===n?void 0:n.map((function(e,s){var n=e.users[0]._id===d._id?e.users[1]:e.users[0];return(0,m.jsxs)("div",{className:"chat-head-container ".concat((null===p||void 0===p?void 0:p._id)===e._id?"selected":""),onClick:function(){return j(e)},children:[(0,m.jsx)("div",{className:"user-avatar",children:(0,m.jsx)(C.Z,(0,f.Z)({},R(n.f_name+" "+n.l_name)))}),(0,m.jsxs)("div",{className:"user-details",children:[(0,m.jsx)("span",{className:"user-name",children:n.f_name+" "+n.l_name}),(0,m.jsx)("br",{}),(0,m.jsxs)("span",{className:"spec-unit",children:["for ",e.chatName]}),(0,m.jsx)("br",{}),(null===e||void 0===e?void 0:e.latestMessages)&&(0,m.jsxs)("p",{className:"last_message",children:[e.latestMessages.sender.profile_name,":"," ",(0,m.jsx)("span",{className:"spec-unit",children:e.latestMessages.message})]})]})]},s)})))]}),window.innerWidth<786&&(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(L,{variant:"permanent",open:H,children:[(0,m.jsx)(F,{sx:{justifyContent:H?"flex-end":"center",minHeight:"60px"},children:H?(0,m.jsx)(N.Z,{onClick:function(){K(!1)},children:(0,m.jsx)(Z.Z,{sx:{color:"black"}})}):(0,m.jsx)(N.Z,{onClick:function(){K(!0)},edge:"start",sx:(0,f.Z)({ml:0},H&&{display:"none"}),children:(0,m.jsx)(w.Z,{sx:{color:"black",width:40,height:40}})})}),(0,m.jsx)(y.Z,{}),(0,m.jsxs)(k.Z,{children:[b&&(0,m.jsx)(S.ZP,{disablePadding:!0,sx:{display:"block"},children:(0,m.jsxs)(I.Z,{sx:{minHeight:48,justifyContent:H?"initial":"center",px:2.5},children:[(0,m.jsx)(B.Z,{sx:{minWidth:0,justifyContent:"center"},children:(0,m.jsx)("div",{className:"user-avatar",children:(0,m.jsx)(x.Z,{variant:"circular",width:45,height:45})})}),(0,m.jsx)(Q.Z,{sx:{opacity:H?1:0,color:"black"},children:(0,m.jsxs)("div",{className:"user-details",children:[(0,m.jsx)("span",{className:"user-name",children:(0,m.jsx)(x.Z,{variant:"h4",sx:{width:"100%"}})}),(0,m.jsxs)("span",{className:"spec-unit",children:[" ",(0,m.jsx)(x.Z,{variant:"text",sx:{width:"100%"}})]})]})})]})}),!b&&d&&(null===n||void 0===n?void 0:n.map((function(e,s){var n=e.users[0]._id===d._id?e.users[1]:e.users[0];return(0,m.jsx)(S.ZP,{disablePadding:!0,sx:{display:"block",backgroundColor:(null===p||void 0===p?void 0:p._id)===e._id?"#FFF1C8":""},children:(0,m.jsxs)(I.Z,{onClick:function(){return j(e)},sx:{minHeight:48,justifyContent:H?"initial":"center",px:2.5},children:[(0,m.jsx)(B.Z,{sx:{minWidth:0,justifyContent:"center"},children:(0,m.jsx)("div",{className:"user-avatar",children:(0,m.jsx)(C.Z,(0,f.Z)({},R(n.f_name+" "+n.l_name)))})}),(0,m.jsx)(Q.Z,{sx:{opacity:H?1:0,color:"black"},children:(0,m.jsxs)("div",{className:"user-details",children:[(0,m.jsx)("span",{className:"user-name",children:n.f_name+" "+n.l_name}),(0,m.jsxs)("span",{className:"spec-unit",children:["for ",e.chatName]})]})})]})},s)})))]})]})})]})};var H=function(){var e=(0,t.useContext)(h.Z).setSelectedPage;return(0,t.useEffect)((function(){e("message")}),[]),(0,m.jsxs)("div",{className:"chat-container",children:[(0,m.jsx)("div",{className:"chathead-container",children:(0,m.jsx)(E,{})}),(0,m.jsx)("div",{className:"chatspace-container",children:(0,m.jsx)(p,{})})]})}}}]);
//# sourceMappingURL=243.1f509b0d.chunk.js.map