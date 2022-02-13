import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CButton,
  CCol,
  CRow,
  CModal,
  CFormGroup,
  CLabel,
  CInput,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CSwitch,
  CSelect,
} from '@coreui/react';
import { v4 as uuid } from 'uuid';

import Loading from '../containers/Loading';
import { hideStudentModal } from 'src/store/students';
import Helpers from 'src/utils/Helpers';
import { useAddStudent, useUpdateStudent } from 'src/hooks/useStudents';

const StudentModal = ({ student, loading }) => {
  const dispatch = useDispatch();
  const { mutate: addStudent, isLoading: loadingAddStudent } = useAddStudent();
  const { mutate: updateStudent, isLoading: loadingUpdateStudent } = useUpdateStudent();

  const { showStudentModal, operation } = useSelector((state) => state.students);
  const { role } = useSelector((state) => state.global);

  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);

  const countries = Helpers.getCountries();
  const relationships = ['Parent', 'Sibling', 'Spouse'];

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    dateOfBirth: '',
  });

  const handleHideModal = () => {
    dispatch(hideStudentModal());
  };

  useEffect(() => {
    if (student && student.data) {
      setId(student.data.id);
      setFirstName(student.data.firstName);
      setLastName(student.data.lastName);
      setNationality(student.data.nationality);
      setDateOfBirth(student.data.dateOfBirth);
      setFamilyMembers(student.data.studentFamilyMembers || []);
      setErrors({});
      if (student.data.status === 'approved') {
        setSwitchEnabled(true);
      } else {
        setSwitchEnabled(false);
      }
    } else {
      setId('');
      setFirstName('');
      setLastName('');
      setNationality('');
      setDateOfBirth('');
      setFamilyMembers([]);
      setSwitchEnabled(false);
      setErrors({});
    }
  }, [student]);

  const handleChangeFamilyMember = (changedMember, changedField, value) => {
    const newFamilyMembers = [...familyMembers];
    const selectedMemberIndex = newFamilyMembers.findIndex((member) => member.id === changedMember.id);
    newFamilyMembers[selectedMemberIndex][changedField] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { id: uuid(), firstName: '', lastName: '', relationship: '', nationality: '' }]);
  };

  const handleDeleteFamilyMember = (selectedMember) => {
    const newFamilyMembers = familyMembers.filter((familyMember) => familyMember.id !== selectedMember.id);
    setFamilyMembers(newFamilyMembers);
  };

  const handleSaveStudent = async () => {
    let valid = true;
    let errorsTemp = {
      firstName: '',
      lastName: '',
      nationality: '',
      dateOfBirth: '',
    };
    if (!firstName) {
      errorsTemp.firstName = 'First Name is required';
      valid = false;
    }
    if (!lastName) {
      errorsTemp.lastName = 'Last Name is required';
      valid = false;
    }
    if (!nationality) {
      errorsTemp.nationality = 'Nationality is required';
      valid = false;
    }
    if (!dateOfBirth) {
      errorsTemp.dateOfBirth = 'Date of Birth is required';
      valid = false;
    }
    setErrors((errors) => {
      return { ...errors, ...errorsTemp };
    });
    if (!valid) {
      return;
    }

    const studentData = {
      firstName,
      lastName,
      nationality,
      dateOfBirth,
      status: 'pending_approval',
    };

    if (switchEnabled) {
      studentData.status = 'approved';
    }

    const cleanFamilyMembers = familyMembers.filter((member) => member.firstName && member.lastName && member.nationality && member.relationship);
    studentData.familyMembers = cleanFamilyMembers;

    if (id) {
      studentData.id = id;
      await updateStudent({ studentData, studentId: id, role });
    } else {
      await addStudent({ studentData, role });
    }
    dispatch(hideStudentModal());
    setErrors({});
  };

  return (
    <CModal show={showStudentModal} onClose={handleHideModal} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{operation} Student</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CRow>
              <CCol sm="12">
                <h4>Basic Information</h4>
                <hr />
              </CCol>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>First Name *</CLabel>
                  <CInput
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    invalid={errors.firstName ? true : false}
                    disabled={operation === 'View' && role === 'admin'}
                  />
                  <p className="error-text">{errors.firstName}</p>
                </CFormGroup>
              </CCol>
              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Last Name *</CLabel>
                  <CInput
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    invalid={errors.lastName ? true : false}
                    disabled={operation === 'View' && role === 'admin'}
                  />
                  <p className="error-text">{errors.lastName}</p>
                </CFormGroup>
              </CCol>
              <CCol sm={6}>
                <CFormGroup>
                  <CLabel>Nationality *</CLabel>
                  <CSelect
                    custom
                    name="select"
                    id="select"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    invalid={errors.nationality ? true : false}
                    disabled={operation === 'View' && role === 'admin'}
                  >
                    <option value="">Select Student's Nationality</option>

                    {countries &&
                      countries.length > 0 &&
                      countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                  </CSelect>
                  <p className="error-text">{errors.nationality}</p>
                </CFormGroup>
              </CCol>

              <CCol sm="6">
                <CFormGroup>
                  <CLabel>Date of Birth *</CLabel>
                  <CInput
                    placeholder="Select Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    invalid={errors.dateOfBirth ? true : false}
                    disabled={operation === 'View' && role === 'admin'}
                  />
                  <p className="error-text">{errors.dateOfBirth}</p>
                </CFormGroup>
              </CCol>
            </CRow>

            {role === 'registrar' && (
              <CFormGroup>
                <CLabel>Status</CLabel>
                <br />
                <CSwitch
                  className={'mx-1'}
                  variant={'3d'}
                  color={'success'}
                  checked={switchEnabled}
                  onChange={() => setSwitchEnabled(!switchEnabled)}
                  disabled={operation === 'View' && role === 'admin'}
                />
                <span className="switch-text">{switchEnabled ? 'Approved' : 'Pending Approval'}</span>
              </CFormGroup>
            )}

            <br />

            <CRow>
              <CCol sm="12">
                <h4>Family Information</h4>
                <hr />
              </CCol>
            </CRow>

            {familyMembers.map((familyMember) => (
              <CRow key={familyMember.id}>
                <CCol sm="3">
                  <CFormGroup>
                    <CLabel>First Name *</CLabel>
                    <CInput
                      placeholder="Enter first name"
                      value={familyMember.firstName}
                      onChange={(e) => handleChangeFamilyMember(familyMember, 'firstName', e.target.value)}
                      disabled={operation === 'View' && role === 'admin'}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="3">
                  <CFormGroup>
                    <CLabel>Last Name *</CLabel>
                    <CInput
                      placeholder="Enter last name"
                      value={familyMember.lastName}
                      onChange={(e) => handleChangeFamilyMember(familyMember, 'lastName', e.target.value)}
                      disabled={operation === 'View' && role === 'admin'}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="2">
                  <CFormGroup>
                    <CLabel>Relationship *</CLabel>
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      value={familyMember.relationship}
                      onChange={(e) => handleChangeFamilyMember(familyMember, 'relationship', e.target.value)}
                      disabled={operation === 'View' && role === 'admin'}
                    >
                      <option value="">Select Relationship</option>

                      {relationships &&
                        relationships.length > 0 &&
                        relationships.map((relationship) => (
                          <option key={relationship} value={relationship}>
                            {relationship}
                          </option>
                        ))}
                    </CSelect>
                    <p className="error-text">{errors.nationality}</p>
                  </CFormGroup>
                </CCol>
                <CCol sm="3">
                  <CFormGroup>
                    <CLabel>Nationality *</CLabel>
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      value={familyMember.nationality}
                      onChange={(e) => handleChangeFamilyMember(familyMember, 'nationality', e.target.value)}
                      disabled={operation === 'View' && role === 'admin'}
                    >
                      <option value="">Select Member's Nationality</option>

                      {countries &&
                        countries.length > 0 &&
                        countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>

                <CCol sm="1 pt-1">
                  <CButton color="danger" className="mt-4" onClick={() => handleDeleteFamilyMember(familyMember)} title="Remove Member">
                    X
                  </CButton>
                </CCol>
              </CRow>
            ))}

            <CRow>
              <CCol sm="12">
                <CButton color="warning" className="mb-4" onClick={handleAddFamilyMember} disabled={operation === 'View' && role === 'admin'}>
                  Add Family Member
                </CButton>
              </CCol>
            </CRow>
          </>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSaveStudent} disabled={loadingAddStudent || loadingUpdateStudent}>
          {loadingAddStudent || loadingUpdateStudent ? 'Saving' : 'Save'}
        </CButton>{' '}
        <CButton color="secondary" onClick={handleHideModal}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default StudentModal;
