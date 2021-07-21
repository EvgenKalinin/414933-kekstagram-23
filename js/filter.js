const ID_SYMBOL_COUNT = 7;
const filters = document.querySelector('.img-filters');

const Style = {
  INACTIVE: 'img-filters--inactive',
  ACTIVE: 'img-filters__button--active',
};

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

  if (typeof onFilterChange === 'function') {
    onFilterChange(target.id.slice(ID_SYMBOL_COUNT));
  }
});


export {setFilterChangeHandler, showFilters};
