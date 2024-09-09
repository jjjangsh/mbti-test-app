import testInstance from "../axiosInstances/testInstance";

export const getTestResults = async () => {
  const { data } = await testInstance.get("/testResults");
  return data;
};

export const createTestResult = async (resultData) => {
  await testInstance.post("/testResults", resultData);
};

export const deleteTestResult = async (id) => {
  await testInstance.delete(`/testResults/${id}`);
};

export const updateTestResultVisibility = async (id, visibility) => {
  await testInstance.patch(`/testResults/${id}`, { visibility });
};
