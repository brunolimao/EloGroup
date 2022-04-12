//Leads pré existentes, para popular e testar
const potencialLeads = [
  { "name": "Microsoft", "origin": 1 },
]
const dataLeads = [
  { "name": "Google", "origin": 2 },
  { "name": "Tesla", "origin": 2 },
]
const meetingLeads = [
  { "name": "Fiat", "origin": 3 },
]

//Atualizar e incluir os Leads do localStorage
const updateLeads = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (!isNaN(key)) {
      let name = localStorage.getItem(key);
      let newLeadName = name.replace('"', '').replace('"', '');
      let aux = 0;
      potencialLeads.find((lead, index) => {
        if (newLeadName === lead.name) {
          aux = 1;
        }
      })
      if (aux === 0) {
        potencialLeads.push({ "name": newLeadName, "origin": 1 });
      }
    }
  }
}

export { updateLeads, potencialLeads, dataLeads, meetingLeads }