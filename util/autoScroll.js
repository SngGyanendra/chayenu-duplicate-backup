export function autoScrollToPlan(selectedCountry, selectPlanRef, distributor) {
  if (selectedCountry?.name === 'USA') {
    selectPlanRef?.scrollIntoView({ behavior: 'smooth' });
  } else if (
    selectedCountry &&
    selectedCountry?.name !== 'USA' &&
    !selectedCountry.has_distributors
  ) {
    selectPlanRef?.scrollIntoView({ behavior: 'smooth' });
  } else if (
    selectedCountry &&
    selectedCountry?.name !== 'USA' &&
    selectedCountry.has_distributors &&
    selectedCountry?.distributors?.some(
      (item) => item.id === parseInt(distributor)
    )
  ) {
    selectPlanRef?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function autoScrollToForm(selectedPlan, formRef) {
  if (selectedPlan) {
    formRef?.scrollIntoView({ behavior: 'smooth' });
  }
}
