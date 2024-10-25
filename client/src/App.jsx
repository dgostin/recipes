import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import Recipes from "./Recipes";
import { useRecipeStore, useAppStore } from "./store";
import ReactPaginate from "react-paginate";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import Logo from "/Recipe Finder.jpg";
import LoadingSpinner from "./LoadingSpinner";

const App = () => {
  const term = useRecipeStore((state) => state.term);
  const selectedCuisineTypes = useRecipeStore(
    (state) => state.selectedCuisineTypes
  );
  const selectedMealTypes = useRecipeStore((state) => state.selectedMealTypes);
  const formSubmitted = useAppStore((state) => state.formSubmitted);
  const setFormSubmitted = useAppStore((state) => state.setFormSubmitted);
  const recipes = useRecipeStore((state) => state.recipes);
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const setErrorMessage = useAppStore((state) => state.setErrorMessage);
  const timer = useAppStore((state) => state.timer);
  const setTimer = useAppStore((state) => state.setTimer);

  const loading = useAppStore((state) => state.loading);
  const setLoading = useAppStore((state) => state.setLoading);

  const pageCount = useRecipeStore((state) => state.pageCount);
  const setPageCount = useRecipeStore((state) => state.setPageCount);
  const currentPage = useRecipeStore((state) => state.currentPage);
  const setCurrentPage = useRecipeStore((state) => state.setCurrentPage);

  const itemsPerPage = 6;

  const fetchRecipes = async (page = 0) => {
    try {
      setLoading(true);
      const from = page * itemsPerPage;
      const to = from + itemsPerPage;
      // console.log("from", from);
      // console.log("to", to);
      const url = import.meta.env.VITE_APP_API_URL;
      // const res = await axios.post(url, {

      const res = await axios.get("/api/recipes", {
        params: {
          from,
          to,
          term,
          selectedCuisineTypes,
          selectedMealTypes,
        },
      });
      setLoading(false);
      setFormSubmitted(true);
      setRecipes(res.data.hits);
      console.log(res.data.hits);
      const total = res.data.count;
      setPageCount(Math.ceil((total > 100 ? 100 : total) / itemsPerPage));
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCuisineTypes.length && !selectedMealTypes.length && !term) {
      if (timer) {
        clearTimeout(timer);
      }
      setErrorMessage("Need a search term or a filter selection");
      setTimer(
        setTimeout(() => {
          setErrorMessage("");
          setTimer(null);
        }, 2500)
      );
    } else {
      fetchRecipes();
      // setCurrentPage(0);
    }
  };

  const handlePageClick = (event) => {
    // console.log(`User requested page number ${event.selected}`);
    setCurrentPage(event.selected);
    fetchRecipes(event.selected);
  };

  return (
    <div className="min-h-screen px-6 py-8 container mx-auto my-5 rounded-2xl from-gray-400 bg-gradient-to-b to-gray-100">
      <div className="flex justify-center items-center gap-3 py-2">
        <h1 className="text-3xl font-bold text-center">Recipe</h1>
        <img
          src={Logo}
          alt="Recipe Finder"
          className="h-20 w-20 rounded border-[1px] border-black"
        />
        <h1 className="text-3xl font-bold text-center">Finder</h1>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-3">
          <div
            className={`${
              recipes.length ? "lg:w-[200px]" : "md:w-[500px]"
            } mx-auto`}
          >
            <SearchForm handleSubmit={handleSubmit} />

            {!recipes.length && formSubmitted && (
              <p className="text-center text-gray-900 text-2xl mt-10">
                No recipes found.
              </p>
            )}
          </div>

          <div
            className={`mx-auto xl:w-[1200px] ${
              recipes.length ? "" : "hidden"
            }`}
          >
            <Recipes />
            <ReactPaginate
              breakLabel="..."
              nextLabel={<GrLinkNext />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              forcePage={currentPage}
              containerClassName="lg:mx-40 flex justify-center items-center mb-5 gap-[5px] mt-7 md:text-lg rounded border-[1px] border-slate-400 py-2 bg-gray-400"
              pageLinkClassName="px-2 md:px-4 py-2 rounded-sm hover:bg-gray-700"
              previousClassName="md:px-4 py-2 rounded-sm hover:bg-gray-700 bg-gray-400"
              nextClassName="md:px-4 py-2 rounded-sm font-normal hover:bg-gray-700"
              activeClassName="py-2 rounded-sm font-normal bg-gray-700 text-white"
              previousLabel={<GrLinkPrevious />}
              disabledClassName="pointer-events-none"
              // disabledLinkClassName="text-red-500"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
