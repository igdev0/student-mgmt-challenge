const asyncHandler = require("express-async-handler");
const {
    getAllStudents,
    addNewStudent,
    deleteStudentService,
    getStudentDetail,
    setStudentStatus,
    updateStudent,
    countAllStudents
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        search,
        class: className,
        section
    } = req.query;
    const payload = {className, section, limit, page, search};
    const students = await getAllStudents(payload);
    const totalRecords = await countAllStudents(payload);
    res.json({page, limit, pagesCount: Math.ceil(totalRecords / limit), data: students});
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const {
        name, gender, phone,
        email,
        class: class_name,
        section: section_name,
        roll,
        currentAddress: current_address,
        permanentAddress: permanent_address,
        fatherName: father_name,
        fatherPhone: father_phone,
        motherName: mother_name,
        motherPhone: mother_phone,
        guardianName: guardian_name,
        guardianPhone: guardian_phone,
        relationOfGuardian: relation_of_guardian,
        dob,
        admissionDate: admission_dt,
    } = req.body;

    const payload = {
        name,
        email,
        is_active: false,
        phone,
        gender,
        dob,
        class: class_name,
        section: section_name,
        roll,
        father_name,
        father_phone,
        mother_name,
        mother_phone,
        guardian_name,
        guardian_phone,
        relation_of_guardian,
        current_address,
        permanent_address,
        admission_dt,
    }
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {
        name, gender, phone,
        email,
        class: class_name,
        section: section_name,
        roll,
        currentAddress: current_address,
        permanentAddress: permanent_address,
        fatherName: father_name,
        fatherPhone: father_phone,
        motherName: mother_name,
        motherPhone: mother_phone,
        guardianName: guardian_name,
        guardianPhone: guardian_phone,
        relationOfGuardian: relation_of_guardian,
        dob,
        admissionDate: admission_dt,
    } = req.body;
    const payload = {
        userId: id,
        name,
        email,
        is_active: false,
        phone,
        gender,
        dob,
        class: class_name,
        section: section_name,
        roll,
        father_name,
        father_phone,
        mother_name,
        mother_phone,
        guardian_name,
        guardian_phone,
        relation_of_guardian,
        current_address,
        permanent_address,
        admission_dt,
    }
    const message = await updateStudent(payload);
    res.json(message);

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const detail = await getStudentDetail(id);
    res.json(detail);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const {id: userId} = req.params;
    const {reviewerId, status} = req.body;
    const message = await setStudentStatus({userId, reviewerId, status});
    res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    await deleteStudentService(req.params.id);
    res.json({message: "Student deleted successfully"});
})

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent,
};
