'use client';

export function ProductFilters({ filtersData, onFiltersChange }: any) {
  return (
    <div className="flex m-4 ">
      <div className="filter-group">
        <h3>Модель</h3>
        <ul>
          {filtersData.model.map((model: any) => (
            <li key={model} className="cursor-pointer">
              <input
                type="checkbox"
                id={`model-${model}`}
                value={model}
                className="cursor-pointer"
                onChange={() => onFiltersChange(model, 'model')}
              />
              <label className="cursor-pointer" htmlFor={`model-${model}`}>
                {model}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-group ml-10">
        <h3>Цвет</h3>
        <ul>
          {filtersData.color.map((color: any) => (
            <li key={color} className="cursor-pointer">
              <input
                type="checkbox"
                id={`color-${color}`}
                value={color}
                className="cursor-pointer"
                onChange={() => onFiltersChange(color, 'color')}
              />
              <label className="cursor-pointer" htmlFor={`color-${color}`}>
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
