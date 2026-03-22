import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter(
    { selectedCategories, setSelectedCategories }: 
    { selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void }) {
    
    
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => { 
        const fetchCategories = async () => {
            try {
            const response = await fetch(`https://localhost:4000/api/Water/GetProjectTypes`);
            const data = await response.json();

            console.log('Fetched categories:', data);
            setCategories(data);
            } 

            catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    function handleCheckboxChange({target}: {target: HTMLInputElement}) 
    {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(cat => cat !== target.value) : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
    }


  return (
    <div className="category-filter">
      <h5 className="category-filter__title">Project Types</h5>
      <div className="category-filter__list">
        {categories.map((category) => (
          <div key={category} className="category-filter__item">
            <input
              type="checkbox"
              id={category}
              value={category}
              className="category-filter__checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category} className="category-filter__label">
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;