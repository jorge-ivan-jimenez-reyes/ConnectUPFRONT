// Utilidades para debug y monitoreo de la API

export const logApiResponse = (endpoint: string, response: any) => {
  console.group(`🌐 API Response: ${endpoint}`);
  console.log('Response type:', typeof response);
  console.log('Response keys:', response ? Object.keys(response) : 'null/undefined');
  console.log('Full response:', response);
  console.groupEnd();
};

export const logLoginFlow = (step: string, data: any) => {
  console.group(`🔐 Login Flow: ${step}`);
  console.log('Data:', data);
  console.log('Timestamp:', new Date().toISOString());
  console.groupEnd();
};

export const validateJWTResponse = (response: any): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  if (!response) {
    issues.push('Response is null or undefined');
    return { isValid: false, issues };
  }
  
  if (!response.access) {
    issues.push('Missing access token');
  }
  
  if (!response.refresh) {
    issues.push('Missing refresh token');
  }
  
  if (response.user === undefined) {
    issues.push('User information not included in response');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

export const createUserFromJWT = (email: string, isAdmin: boolean) => {
  return {
    id: Date.now().toString(),
    email: email,
    firstName: isAdmin ? 'Admin' : 'Usuario',
    lastName: 'Sistema',
    role: isAdmin ? 'admin' as const : 'user' as const,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}; 