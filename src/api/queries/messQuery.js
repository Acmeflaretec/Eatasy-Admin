import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    getMesses,
    getMessById,
    addMesses,
    editMess,
    deleteMess,
} from "../urls/messUrls";

const useGetMesses = (data) => {
  return useQuery(["get_messes", data], () => getMesses(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};

const useGetMessById = (data) => {
  return useQuery(["get_messes", data], () => getMessById(data), {
    staleTime: 3000,
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });
};


const useAddMess = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addMesses(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_messes");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useEditMess = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => editMess(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_messes");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};

const useDeleteMess = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => deleteMess(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get_messes");
      return data;
    },
    onError: (data) => {
      return data;
    },
  });
};


export {
  useGetMesses,
  useGetMessById,
  useAddMess,
  useEditMess,
  useDeleteMess,
};
