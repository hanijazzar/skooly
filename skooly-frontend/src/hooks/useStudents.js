import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { setAlert } from 'src/store/alert';
import { useDispatch } from 'react-redux';

const API_URL = process.env.REACT_APP_API_URL;

const getStudents = async (count, page) => {
  const GET_STUDENTS = `${API_URL}/students?count=${count}&page=${page}`;
  try {
    const res = await axios.get(GET_STUDENTS);
    return res.data?.data;
  } catch (err) {
    console.log(err);
    return 'Server Error';
  }
};

const searchStudents = async (searchTerm, count, page) => {
  const SEARCH_STUDENTS = `${API_URL}/students/search?searchTerm=${searchTerm}&count=${count}&page=${page}`;
  try {
    const res = await axios.get(SEARCH_STUDENTS);
    return res.data?.data;
  } catch (err) {
    console.log(err);
    return 'Server Error';
  }
};

const getStudentDetails = async (studentId) => {
  const GET_STUDENT_DETAILS = `${API_URL}/students/${studentId}`;
  try {
    const res = await axios.get(GET_STUDENT_DETAILS);
    return res.data;
  } catch (err) {
    console.log(err);
    return 'Server Error';
  }
};

const addStudent = async ({ studentData, role }) => {
  const ADD_STUDENT = `${API_URL}/students`;
  const config = {
    headers: {
      'x-user-role': role
    }
  };
  try {
    const res = await axios.post(ADD_STUDENT, studentData, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return 'Server Error';
  }
};

const updateStudent = async ({ studentData, studentId, role }) => {
  const UPDATE_STUDENT = `${API_URL}/students/${studentId}`;
  const config = {
    headers: {
      'x-user-role': role
    }
  };

  try {
    const res = await axios.put(UPDATE_STUDENT, studentData, config);
    return res.data;
  } catch (err) {
    console.log(err);
    return 'Server Error';
  }
};

const deleteStudent = async ({ studentId }) => {
  const DELETE_STUDENT = `${API_URL}/students/${studentId}`;

  try {
    const res = await axios.delete(DELETE_STUDENT);
    return res.data;
  } catch (err) {
    console.log(err);
    return 'Server Error';
  }
};

/// /////////////////////////////////////////////////////////////////////////

/**
 * Get the list of students
 * @param {object} options Options to be passed as react-query options, like staleTime: 30000
 * @param {number} count Number of items per page
 * @param {number} page Page number
 */
export const useStudents = (options, count = 10, page = 1) => {
  const queryClient = useQueryClient();

  return useQuery(['getStudents', page], () => getStudents(count, page), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(['searchStudents']);
    },
  });
};

/**
 * Search for students
 * @param {object} options Options to be passed as react-query options, like staleTime: 30000
 * @param {number} searchTerm Term to search student
 * @param {number} count Number of items per page
 * @param {number} page Page number
 */
export const useSearchStudents = (options, searchTerm = '', count = 10, page = 1) => {

  return useQuery(['searchStudents', page], () => searchStudents(searchTerm, count, page), {
    enabled: false,
    refetchOnWindowFocus: false,
    ...options,

  });
};

/**
 * Get the details of a student
 * @param {string} studentId The id of the student to get the details of
 * @param {object} options Options to be passed as react-query options, like staleTime: 30000
 */
export const useStudentDetails = (studentId, options = {}) => {
  return useQuery(['getStudentDetails', studentId], () => getStudentDetails(studentId), {
    ...options,
    enabled: false,
    cacheTime: 0,
    staleTime: 0
  });
};

/**
 * Add a student
 * @param {object} options Options to be passed as react-query options, like staleTime: 30000
 */
export const useAddStudent = (options = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation(addStudent, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(['getStudents']);
      queryClient.invalidateQueries(['searchStudents']);
      dispatch(setAlert('Student Added Successfully', 'success'));
    },
  });
};

/**
 * Update a student
 * @param {object} options Options to be passed as react-query options, like staleTime: 30000
 */
export const useUpdateStudent = (studentId, options = {}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation(updateStudent, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(['getStudents']);
      queryClient.invalidateQueries(['getStudentDetails', studentId]);
      queryClient.invalidateQueries(['searchStudents']);
      dispatch(setAlert('Student Updated Successfully', 'success'));
    },
  });
};

/**
 * Delete a student
 * @param {object} options Options to be passed as react-query options, like staleTime: 30000
 */
export const useDeleteStudent = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation(deleteStudent, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(['getStudents']);
    },
  });
};

export default useStudents;
