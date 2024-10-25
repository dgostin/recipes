import React from "react";
import { useRecipeStore, useAppStore } from "./store";

const SearchForm = ({ handleSubmit }) => {
  const cuisineTypeoptions = [
    { id: 1, label: "American" },
    { id: 2, label: "Asian" },
    { id: 3, label: "British" },
    { id: 4, label: "Caribbean" },
    { id: 5, label: "Central Europe" },
    { id: 6, label: "Chinese" },
    { id: 7, label: "Eastern Europe" },
    { id: 8, label: "French" },
    { id: 9, label: "Indian" },
    { id: 10, label: "Italian" },
    { id: 11, label: "Japanese" },
    { id: 12, label: "Kosher" },
    { id: 13, label: "Mediterranean" },
    { id: 14, label: "Mexican" },
    { id: 15, label: "Middle Eastern" },
    { id: 16, label: "Nordic" },
    { id: 17, label: "South American" },
    { id: 18, label: "South East Asian" },
  ];

  const mealTypeoptions = [
    { id: 1, label: "Breakfast" },
    { id: 2, label: "Dinner" },
    { id: 3, label: "Lunch" },
    { id: 4, label: "Snack" },
    { id: 5, label: "Teatime" },
  ];

  const setTerm = useRecipeStore((state) => state.setTerm);
  const setSelectedCuisineTypes = useRecipeStore(
    (state) => state.setSelectedCuisineTypes
  );
  const selectedCuisineTypes = useRecipeStore(
    (state) => state.selectedCuisineTypes
  );
  const setSelectedMealTypes = useRecipeStore(
    (state) => state.setSelectedMealTypes
  );
  const selectedMealTypes = useRecipeStore((state) => state.selectedMealTypes);
  const setFormSubmitted = useAppStore((state) => state.setFormSubmitted);
  const errorMessage = useAppStore((state) => state.errorMessage);
  const loading = useAppStore((state) => state.loading);

  return (
    <form onSubmit={handleSubmit} className="mt-8 mx-auto">
      <div className="mb-3">
        <h4
          className={
            "block text-sm font-medium mb-0 " +
            (errorMessage ? "text-red-600" : "text-gray-700")
          }
        >
          Search&nbsp;Term:
        </h4>

        <input
          type="text"
          name="term"
          onChange={(e) => {
            setFormSubmitted(false);
            setTerm(e.target.value);
          }}
          //   placeholder="Search term..."
          className="w-full p-1 border border-gray-800 rounded text-sm"
        />
      </div>
      <div className="mb-4">
        <MultiSelectWithCheckboxes
          label={"Cuisine Type"}
          options={cuisineTypeoptions}
          selectedOptions={selectedCuisineTypes}
          setSelectedOptions={setSelectedCuisineTypes}
          errorMessage={errorMessage}
        />
      </div>
      <MultiSelectWithCheckboxes
        label={"Meal Type"}
        options={mealTypeoptions}
        selectedOptions={selectedMealTypes}
        setSelectedOptions={setSelectedMealTypes}
        errorMessage={errorMessage}
      />

      {errorMessage && (
        <div className="bg-white border-red-600 border-2 rounded text-red-600 mt-6 text-center text-sm font-bold">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="w-full p-2 text-white rounded mt-7 bg-blue-500"
      >
        Search
      </button>
    </form>
  );
};

const MultiSelectWithCheckboxes = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  errorMessage,
}) => {
  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      // Remove from selected options if already selected
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      // Add to selected options if not already selected
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <>
      <h4
        className={
          "block mb-2 text-sm font-medium " +
          (errorMessage ? "text-red-600" : "text-gray-700")
        }
      >
        {label}:
      </h4>

      <div className="flex flex-wrap mx-3 gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="checkbox"
              id={`checkbox-${option.id}`}
              value={option.label}
              checked={selectedOptions.includes(option.label)}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor={`checkbox-${option.label
                .toLowerCase()
                .replace(/\s+/g, "-")}-${option.id}`}
              className="ml-1 text-xs text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchForm;
