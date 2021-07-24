const ID_SYMBOL_COUNT = 7;

const Style = {
  INACTIVE: 'img-filters--inactive',
  ACTIVE: 'img-filters__button--active',
};

const filters = document.querySelector('.img-filters');

let onFilterChange = null;

const setFilterChangeHandler = (callback) => {
  onFilterChange = callback;
};

const showFilters = () => {
  filters.classList.remove(Style.INACTIVE);
};

filters.addEventListener('click', (evt) => {
  const target = evt.target;
  if (!target.classList.contains('img-filters__button')) {
    return;
  }

  const activetFilter = filters.querySelector(`button.${Style.ACTIVE}`);
  if (activetFilter === target) {
    return;
  }

  activetFilter.classList.remove(Style.ACTIVE);
  target.classList.add(Style.ACTIVE);

  onFilterChange(target.id.slice(ID_SYMBOL_COUNT));
});

export {setFilterChangeHandler, showFilters};
