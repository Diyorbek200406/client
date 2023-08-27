export const useGetUserId = () => {
	return window.localStorage.getItem('user_id');
};
