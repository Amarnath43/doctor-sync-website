const bcrypt=require('bcrypt');
const {Schema, model}=require('mongoose');

const userSchema=new Schema({
    name:{
        type: Schema.Types.String,
        required:true,
        trim:true
    },
    username:{
        type:Schema.Types.String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:Schema.Types.String,
        required:true,
        trim:true,
        unique:true
    },
    
    password:{
        type:Schema.Types.String,
        required:true,
        trim:true,
    },
    verified:{
        type:Schema.Types.Boolean,
        default:false,
    },
    role:{
        type: Schema.Types.String,
        enum:["patient","doctor"],
        default:null
        
    },
    // Optional fields for doctors
    hospital: {
        type: Schema.Types.String,
        required: function () {
            return this.role === 'doctor';
        },
        trim: true
    },
    specialization: {
        type: Schema.Types.String,
        required: function () {
            return this.role === 'doctor';
        },
        trim: true
    },

     // User profile fields
     phoneNumber: {
        type: Schema.Types.String,
        trim: true
    },
    gender: {
        type: Schema.Types.String,
        enum: ['Male', 'Female', 'Others'],
    },
    dateOfBirth: {
        type: Schema.Types.Date,
    },
    bloodGroup: {
        type: Schema.Types.String,
        enum: ['O+', 'A+', 'B+', 'O-', 'A-', 'B-', 'AB+', 'AB-'],
        
    },
    address: {
        houseNo: {
            type: Schema.Types.String,
            
        },
        colony: {
            type: Schema.Types.String,
            
        },
        city: {
            type: Schema.Types.String,
           
        },
        state: {
            type: Schema.Types.String,
            
        },
        country: {
            type: Schema.Types.String,
            
        },
        pincode: {
            type: Schema.Types.String,
            
        }
    },
    extraPhoneNumber: {
        type: Schema.Types.String,
        trim: true
    },
    language: {
        type: Schema.Types.String,
        enum: ['English', 'Telugu', 'Hindi'],
        
    },
    profilePicture: {
        type: Schema.Types.String,
    }


})

//We're adding a method called isPasswordMatch to every instance of your user model
userSchema.methods.isPasswordMatch = async function(password) {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
};

//user.save() -->before saving the doc to mongodb , doc will undergo this middleware, here password will be hashed before saving the document
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        const isAlreadyHashed = this.password.startsWith("$2b$");
        if (!isAlreadyHashed) {
            this.password = await bcrypt.hash(this.password, 8);
        }
    }
    next();
});


const UserModel = model("User", userSchema);
module.exports = UserModel;