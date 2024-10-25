import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  term: "",
  setTerm: (term) => set(() => ({ term: term })),
  selectedCuisineTypes: [],
  setSelectedCuisineTypes: (types) =>
    set(() => ({ selectedCuisineTypes: types })),
  selectedMealTypes: [],
  setSelectedMealTypes: (types) => set(() => ({ selectedMealTypes: types })),
  recipes: [],
  setRecipes: (recipes) => set(() => ({ recipes: recipes })),
  pageCount: 1,
  setPageCount: (count) => set(() => ({ pageCount: count })),
  currentPage: 0,
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
}));

export const useAppStore = create((set) => ({
  formSubmitted: false,
  setFormSubmitted: (val) => set(() => ({ formSubmitted: val })),
  errorMessage: "",
  setErrorMessage: (msg) => set(() => ({ errorMessage: msg })),
  timer: null,
  setTimer: (timer) => set(() => ({ timer: timer })),
  loading: false,
  setLoading: (loading) => set(() => ({ loading: loading })),
}));
