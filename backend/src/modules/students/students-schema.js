const z = require("zod");
const studentFilterSchema = z.object({
    class: z.string().optional(),
    section: z.string().optional(),
    name: z.string().optional(),
    roll: z.number().optional()
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
    roll: z.number().min(1, 'Roll is required'),
    admission_dt: z.union([z.date(), z.string()])
});

const addressInfoSchema = z.object({
    current_address: z.string().min(1, 'Current Address is required'),
    permanent_address: z.string().min(1, 'Permanent Address is required')
});

const parentsAndGuardianInfoSchema = z.object({
    father_name: z.string().min(1, 'Father Name is required'),
    father_phone: z.string().optional(),
    mother_name: z.string().optional(),
    mother_phone: z.string().optional(),
    guardian_name: z.string().min(1, 'Guardian Name is required'),
    guardian_phone: z.string().min(1, 'Guardian Phone is required'),
    relation_of_guardian: z.string().min(1, 'Relation of guardian is required')
});


const studentSchema = basicInfoSchema.extend(AcademicInfoSchema.shape)
    .extend(addressInfoSchema.shape)
    .extend(parentsAndGuardianInfoSchema.shape)

module.exports = {
    studentFilterSchema,
    basicInfoSchema,
    AcademicInfoSchema,
    addressInfoSchema,
    parentsAndGuardianInfoSchema,
    studentSchema
};