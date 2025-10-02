const z = require("zod");
const StudentFilterSchema = z.object({
    class: z.string().optional(),
    section: z.string().optional(),
    name: z.string().optional(),
    roll: z.string().optional()
});

const basicInfoSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    gender: z.string().min(1, 'Gender is required'),
    dob: z.union([z.date(), z.string()]),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().min(1, 'Email is required')
});

const AcademicInfoSchema = z.object({
    class: z.string().min(1, 'Class is required'),
    section: z.string(),
    roll: z.string().min(1, 'Roll is required'),
    admissionDate: z.union([z.date(), z.string()])
});

const addressInfoSchema = z.object({
    currentAddress: z.string().min(1, 'Current Address is required'),
    permanentAddress: z.string().min(1, 'Permanent Address is required')
});

const parentsAndGuardianInfoSchema = z.object({
    fatherName: z.string().min(1, 'Father Name is required'),
    fatherPhone: z.string().optional(),
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
    guardianName: z.string().min(1, 'Guardian Name is required'),
    guardianPhone: z.string().min(1, 'Guardian Phone is required'),
    relationOfGuardian: z.string().min(1, 'Relation of guardian is required')
});


const studentSchema = basicInfoSchema.extend(AcademicInfoSchema.shape)
    .extend(addressInfoSchema.shape)
    .extend(parentsAndGuardianInfoSchema.shape)

module.exports = {
    StudentFilterSchema,
    basicInfoSchema,
    AcademicInfoSchema,
    addressInfoSchema,
    parentsAndGuardianInfoSchema,
    studentSchema
};