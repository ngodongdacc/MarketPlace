module.exports = {
    isEmail: (email)=>{
            var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            if (!email)
                return false;
        
            if(email.length>254)
                return false;
        
            var valid = emailRegex.test(email);
            if(!valid)
                return false;
        
            // Further checking of some things regex can't handle
            var parts = email.split("@");
            if(parts[0].length>64)
                return false;
        
            var domainParts = parts[1].split(".");
            if(domainParts.some(function(part) { return part.length>63; }))
                return false;
        
            return true;
       
    },
    isPhone: (phone)=>{
            var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            if (!phone)
                return false;
        
            if(phone.length<10)
                return false;
        
            var valid = vnf_regex.test(phone);
            if(!valid)
                return false;
        
        
            return true;
       
    },

    IsJsonString: (str)=>{
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}