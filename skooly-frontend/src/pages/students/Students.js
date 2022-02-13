import React, {  useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CTooltip,
  CPagination,
  CInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { useDeleteStudent, useSearchStudents, useStudentDetails, useStudents } from 'src/hooks/useStudents';
import Loading from 'src/containers/Loading';
import { useDispatch, useSelector } from 'react-redux';
import StudentModal from 'src/components/StudentModal';
import { setOperation, showStudentModal } from 'src/store/students';
import { setAlert } from 'src/store/alert';

const Students = () => {
  const dispatch = useDispatch();
  const { mutate: deleteStudent, isLoading: loadingDeleteStudent } = useDeleteStudent();
  const { role } = useSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [selectedStudentToDelete, setSelectedStudentToDelete] = useState({});

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setIsSearching(false);
      refetchStudents();
    }
  };

  const handleSearchStudents = () => {
    if (searchTerm === '') return;
    refetchSearchStudents();
    setIsSearching(true);
  };

  const fields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'nationality', label: 'Nationality' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'status', label: 'Status' },
    { key: 'id', label: 'Actions' },
  ];

  const {
    data: studentsData,
    isLoading: loadingStudents,
    refetch: refetchStudents,
    isFetching: refetchingStudents,
  } = useStudents({}, 10, currentPage);

  const {
    data: studentsSearchData,
    isLoading: loadingSearchStudents,
    refetch: refetchSearchStudents,
    isFetching: refetchingSearchStudents,
  } = useSearchStudents({}, searchTerm, 10, currentPage);

  const { data: studentDetails, isLoading: loadingStudent, refetch: refetchStudent } = useStudentDetails(selectedStudentId);

  const handleAddStudent = () => {
    dispatch(showStudentModal());
    dispatch(setOperation('Add'));
    setSelectedStudentId(null);
  };

  const handleViewStudent = (student) => {
    dispatch(showStudentModal());
    dispatch(setOperation('View'));
    setSelectedStudentId(student.id);
  };

  const handleEditStudent = (student) => {
    dispatch(showStudentModal());
    dispatch(setOperation('Edit'));
    setSelectedStudentId(student.id);
  };

  useEffect(() => {
    if (selectedStudentId) {
      refetchStudent();
    }
  }, [refetchStudent, selectedStudentId]);

  const handleHideDeleteStudentModal = () => {
    setShowDeleteStudentModal(false);
    setSelectedStudentToDelete({});
  };

  const handleDeleteStudent = (studentToDelete) => {
    setShowDeleteStudentModal(true);
    setSelectedStudentToDelete(studentToDelete);
  };

  const handleConfirmDeleteStudent = () => {
    deleteStudent({ studentId: selectedStudentToDelete.id });
    dispatch(setAlert('Student Deleted Successfully', 'success'));
    handleHideDeleteStudentModal();
  };

  return (
    <>
      <CRow className="mb-2">
        <CCol sm={12} md={12}>
          <CCard>
            <CCardHeader>Students</CCardHeader>
            <CCardBody>
              <div>
                <StudentModal student={studentDetails} loading={loadingStudent} />
                <CButton color="primary" className="mb-4" onClick={handleAddStudent}>
                  Add Student
                </CButton>

                <div>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CInput
                        placeholder="Enter search term"
                        value={searchTerm}
                        onChange={(e) => handleChangeSearchTerm(e)}
                        onKeyDown={(e) => {
                          if (e.key === 13 || e.keyCode === 13) {
                            handleSearchStudents();
                          }
                        }}
                      />
                    </CCol>
                    <CCol md="4">
                      <CButton color="primary" onClick={handleSearchStudents}>
                        Search
                      </CButton>
                      <CButton
                        color="primary-outline"
                        className="ml-2"
                        onClick={() => {
                          setSearchTerm('');
                          setIsSearching(false);
                        }}
                      >
                        Clear
                      </CButton>
                    </CCol>
                  </CRow>
                </div>

                {loadingStudents || refetchingStudents || loadingSearchStudents || refetchingSearchStudents ? (
                  <Loading />
                ) : (
                  <>
                    {studentsData && (
                      <CDataTable
                        items={studentsSearchData && isSearching ? studentsSearchData.students : studentsData.students}
                        fields={fields}
                        hover
                        striped
                        bordered
                        itemsPerPage={10}
                        scopedSlots={{
                          id: (studentItem) => (
                            <td>
                              {role === 'admin' ? (
                                <CTooltip content="View Student" trigger="mouseenter">
                                  <CButton variant="outline" color="primary" onClick={() => handleViewStudent(studentItem)}>
                                    <CIcon content={freeSet.cilUser} size="sm" />
                                  </CButton>
                                </CTooltip>
                              ) : (
                                <>
                                  <CTooltip content="Edit Student" trigger="mouseenter">
                                    <CButton variant="outline" color="primary" onClick={() => handleEditStudent(studentItem)} className="ml-2">
                                      <CIcon content={freeSet.cilUser} size="sm" />
                                    </CButton>
                                  </CTooltip>
                                  <CTooltip content="Delete Student" trigger="mouseenter">
                                    <CButton variant="outline" color="primary" onClick={() => handleDeleteStudent(studentItem)} className="ml-2">
                                      <CIcon content={freeSet.cilTrash} size="sm" />
                                    </CButton>
                                  </CTooltip>
                                </>
                              )}
                            </td>
                          ),
                          status: (studentItem) => (
                            <td>
                              <p>{studentItem.status === 'pending_approval' ? 'Pending Approval' : 'Approved'}</p>
                            </td>
                          ),
                        }}
                      />
                    )}
                    <div>
                      <CPagination
                        activePage={currentPage}
                        pages={studentsSearchData && isSearching ? studentsSearchData?.meta?.totalPages : studentsData?.meta?.totalPages}
                        onActivePageChange={(i) => {
                          if (i === 0) {
                            setCurrentPage(1);
                          } else {
                            setCurrentPage(i);
                          }
                        }}
                      ></CPagination>
                    </div>
                  </>
                )}
              </div>

              <CModal show={showDeleteStudentModal} onClose={handleHideDeleteStudentModal} size="lg">
                <CModalHeader closeButton>
                  <CModalTitle>Delete Student</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <p>Are you sure you want to delete the student {`${selectedStudentToDelete.firstName} ${selectedStudentToDelete.lastName}`}?</p>
                </CModalBody>
                <CModalFooter>
                  <CButton color="primary" onClick={handleConfirmDeleteStudent} disabled={loadingDeleteStudent}>
                    {loadingDeleteStudent ? 'Deleting' : 'Confirm'}
                  </CButton>{' '}
                  <CButton color="secondary" onClick={handleHideDeleteStudentModal}>
                    Cancel
                  </CButton>
                </CModalFooter>
              </CModal>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Students;
