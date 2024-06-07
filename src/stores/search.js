import { defineStore } from 'pinia'
import MiniSearch from 'minisearch'

const res = await fetch('/abstracts.json')
const abs = await res.json()

const abstracts = [...abs].sort(sortAbstracts);

let miniSearch = new MiniSearch({
  idField: 'responseID',
  fields: ['programName', 'healthOrgName', 'programFunding', 'programOperation', 'countiesOffered', 'conditionFocus', 'nmdohTargets', 'programFundingType'], // fields to index for full-text search
  searchOptions: {
    boost: {programName: 5},
  },
  storeFields: ['responseID'] // fields to return with search results
})
miniSearch.addAll(abstracts)

// County count
let countyCount = {};
let countyOptions = [];

// Structure for Sponsor/Programs
let sponsors = new Set()
let sponsorPrograms = {};

// Structure for AbstractIndex
let absIdx = {}

abstracts.forEach((_abs, _idx) => {
  // Counties
  _abs["countiesOffered"].forEach(c => {
    if (c in countyCount) countyCount[c] += 1
    else {
      countyCount[c] = 1
      countyOptions.push({value: c, label: c, checked: false})
    }
  })

  // Sponsors
  sponsors.add(_abs['healthOrgName']);
  if (_abs['healthOrgName'] in sponsorPrograms) sponsorPrograms[_abs['healthOrgName']].push([_abs, _idx])
  else {
    sponsorPrograms[_abs['healthOrgName']] = []
    sponsorPrograms[_abs['healthOrgName']].push([_abs, _idx])
  }

})
countyOptions.sort(sortCounties);
let sponsorsArray = [...sponsors].sort();

function sortAbstracts(a, b) {
  if (a['programName'] > b['programName']) return 1
  else if (a['programName'] < b['programName']) return -1
  else return 0
}

function sortCounties(a, b) {
  if (a['value'] > b['value']) return 1
  else if (a['value'] < b['value']) return -1
  else return 0
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchText: '',
    searchFilters: [{
      id: 'healthOrgType',
      name: 'Program Sponsor',
      options: [
        { value: 'Clinic/Ambulatory Practice', label: 'Clinic/Ambulatory Practice', checked: false },
        { value: 'Educational Institution', label: 'Educational Institution', checked: false },
        { value: 'Health/Hospital System', label: 'Health/Hospital System', checked: false },
        { value: 'Health Plan (Medicare Advantage, Medicaid, Dual Eligible, Other)', label: 'Health Plan', checked: false },
        { value: 'Other', label: 'Other', checked: false },
      ],
    }, {
      id: 'nmdohTargets',
      name: 'Drivers of Health',
      options: [
        { value: 'Air/Water Quality', label: 'Air/Water Quality', checked: false },
        { value: 'Built Environment', label: 'Built Environment', checked: false },
        { value: 'Childcare', label: 'Childcare', checked: false },
        { value: 'Community Safety/Violence', label: 'Community Safety/Violence', checked: false },
        { value: 'Criminal Justice', label: 'Criminal Justice', checked: false },
        { value: 'Discrimination/Racism', label: 'Discrimination/Racism', checked: false },
        { value: 'Economic Security', label: 'Economic Security', checked: false },
        { value: 'Education', label: 'Education', checked: false },
        { value: 'Food/Hunger/Nutrition', label: 'Food/Hunger/Nutrition', checked: false },
        { value: 'Housing', label: 'Housing', checked: false },
        { value: 'Immigration', label: 'Immigration', checked: false },
        { value: 'Legal Services', label: 'Legal Services', checked: false },
        { value: 'Physical Activity/Exercise', label: 'Physical Activity/Exercise', checked: false },
        { value: 'Social Support/Social Isolation', label: 'Social Support/Social Isolation', checked: false },
        { value: 'Substance use', label: 'Substance use', checked: false },
        { value: 'Transportation', label: 'Transportation', checked: false },
        { value: 'All NMDOH', label: 'All NMDOH', checked: false },
        { value: 'Other', label: 'Other', checked: false },
      ],
    }, {
      id: 'nmdohTargetPopulations',
      name: 'Target Populations',
      options: [
        { value: 'Early Childhood (age 0-5 years)', label: 'Early Childhood (age 0-5 years)', checked: false },
        { value: 'Children and Youth', label: 'Children and Youth', checked: false },
        { value: 'Elderly (age 65+)', label: 'Elderly (age 65+)', checked: false },
        { value: 'Homeless', label: 'Homeless', checked: false },
        { value: 'Immigrants', label: 'Immigrants', checked: false },
        { value: 'Medicaid', label: 'Medicaid', checked: false },
        { value: 'Medicare', label: 'Medicare', checked: false },
        { value: 'Uninsured', label: 'Uninsured', checked: false },
        { value: 'Veterans', label: 'Veterans', checked: false },
        { value: 'Disabled', label: 'Disabled', checked: false },
        { value: 'LGBTQ+', label: 'LGBTQ+', checked: false },
        { value: 'All patients are eligible', label: 'All patients are eligible', checked: false },
        { value: 'No specific population', label: 'No specific population', checked: false },
        { value: 'Other', label: 'Other', checked: false },
      ],
    }, {
      id: 'conditionFocus',
      name: 'Health Condition(s)',
      options: [
        { value: 'Asthma', label: 'Asthma', checked: false },
        { value: 'Diabetes', label: 'Diabetes', checked: false },
        { value: 'Hypertension', label: 'Hypertension', checked: false },
        { value: 'Mental Health Diagnosis', label: 'Mental Health Diagnosis', checked: false },
        { value: 'Obesity/Overweight', label: 'Obesity/Overweight', checked: false },
        { value: 'Pregnancy', label: 'Pregnancy', checked: false },
        { value: 'Other', label: 'Other', checked: false },
      ],
    }, {
      id: 'countiesOffered',
      name: 'Counties',
      options: countyOptions
    }, {
      id: 'programIsActive',
      name: 'Program Status (Active/Inactive)',
      options: [
        { value: 'Active', label: 'Active', checked: false },
        { value: 'Inactive', label: 'Inactive', checked: false },
      ],
    }, {
      id: 'programIsEvaluated',
      name: 'Program Evaluated (Yes/No)',
      options: [
        { value: 'Yes', label: 'Yes', checked: false },
        { value: 'No', label: 'No', checked: false },
      ],
    }, {
      id: 'programFundingType',
      name: 'Program Funding Type',
      options: [
        { value: 'Private grant', label: 'Private grant', checked: false },
        { value: 'Government funding (grant, contract, etc.)', label: 'Government funding (grant, contract, etc.)', checked: false },
        { value: 'Operating budget', label: 'Operating budget', checked: false },
        { value: 'Payor reimbursement', label: 'Payor reimbursement', checked: false },
        { value: 'Other', label: 'Other', checked: false },
      ]
    }],
    miniSearchFilteredList: [...abstracts],
    counts: {
      countiesOffered: {},
      healthOrgType: {},
      programIsActive: {},
      programIsEvaluated: {},
      nmdohTargets: {},
      nmdohTargetPopulations: {},
      conditionFocus: {},
      programFundingType: {},
    },
    sponsors: sponsorsArray,
    sponsorPrograms,
    abstractIndex: absIdx,
    isFiltered: false
  }),
  getters: {
    countsMatch: (state) => { return state.miniSearchFilteredList.length === abstracts.length },
    filterSectionCount: (state) => {
      // This looks hectic, but it converts an array of objects to an object with keys using 'id' and the value counting
      return Object.assign({}, ...(state.searchFilters.map(sect => ({ [sect.id]: sect.options.filter((opt) => opt.checked).length }))));
    },
    allOptions: (state) => {
      return state.searchFilters.map(sect => sect.options.filter((opt) => opt.checked)).flat();
    },
    allAbstracts: (state) => {
      return abstracts;
    },
    filteredAbstracts: (state) => {
      let remaining = [...state.miniSearchFilteredList]
      let filters = Object.assign({}, ...(state.searchFilters.map(sect => ({ [sect.id]: sect.options.filter((opt) => opt.checked) }))));

      if (filters['nmdohTargets'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['nmdohTargets'].every((tgt) => {
            return abstract["nmdohTargets"].some(abTgt => abTgt === tgt.value);
          });
        });
      }
      if (filters['healthOrgType'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['healthOrgType'].every((tgt) => {
            return abstract["healthOrgType"] === tgt.value;
          });
        });
      }
      if (filters['nmdohTargetPopulations'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['nmdohTargetPopulations'].every((tgt) => {
            console.log(abstract['nmdohTargetPopulations'], tgt.value);
            return abstract["nmdohTargetPopulations"].some(abTgt => abTgt === tgt.value);
          });
        });
      }
      if (filters['conditionFocus'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['conditionFocus'].every((tgt) => {
            return abstract["conditionFocus"].some(abTgt => abTgt === tgt.value);
          });
        });
      }
      if (filters['countiesOffered'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['countiesOffered'].every((tgt) => {
            return abstract["countiesOffered"].some(abTgt => abTgt === tgt.value);
          });
        });
      }
      if (filters['programIsActive'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['programIsActive'].every((tgt) => {
          return abstract["programIsActive"] === tgt.value
          });
        });
      }
      if (filters['programIsEvaluated'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['programIsEvaluated'].every((tgt) => {
            return abstract["programIsEvaluated"] === tgt.value
          });
        });
      }
      if (filters['programFundingType'].length > 0) {
        remaining = remaining.filter((abstract) => {
          return filters['programFundingType'].every((tgt) => {
            return (Object.hasOwn(abstract, 'programFundingType')) ? abstract["programFundingType"].some(abTgt => abTgt === tgt.value) : false
          });
        });
      }

      return remaining
    }
  },
  actions: {
    removeFilter(label) {
      this.searchFilters.forEach((sect, sIdx) => {
        sect.options.forEach((opt, oIdx) => {
          if (opt.label === label && opt.checked) {
            this.searchFilters[sIdx]['options'][oIdx].checked = false
          }
        })
      })
    },
    performSearch() {
      this.miniSearchFilteredList = []
      this.isFiltered = true

      if (this.searchText && this.searchText.length > 0) {
        const results = miniSearch.search(this.searchText, { prefix: true, fuzzy: 0.2 })
        const ids = results.map(r => r.id)

        this.miniSearchFilteredList = abstracts.filter(ab => ids.includes(ab.responseID)).sort(sortAbstracts)
      } else this.miniSearchFilteredList = [...abstracts]

      this.recalculateCounts()
    },
    recalculateCounts () {
      this.clearCounts()
      
      // Counties
      this.filteredAbstracts.forEach(_abs => {
        _abs["countiesOffered"].forEach(c => {
          if (c in this.counts["countiesOffered"]) this.counts["countiesOffered"][c] += 1
          else this.counts["countiesOffered"][c] = 1
        })

        _abs["nmdohTargets"].forEach(t => {
          if (t in this.counts["nmdohTargets"]) this.counts["nmdohTargets"][t] += 1
          else this.counts["nmdohTargets"][t] = 1
        })

        _abs["nmdohTargetPopulations"].forEach(tp => {
          if (tp in this.counts["nmdohTargetPopulations"]) this.counts["nmdohTargetPopulations"][tp] += 1
          else this.counts["nmdohTargetPopulations"][tp] = 1
        })

        _abs["conditionFocus"].forEach(cf => {
          if (cf in this.counts["conditionFocus"]) this.counts["conditionFocus"][cf] += 1
          else this.counts["conditionFocus"][cf] = 1
        })
        _abs["programFundingType"]?.forEach(ft => {
          if (ft in this.counts["programFundingType"]) this.counts["programFundingType"][ft] += 1
          else this.counts["programFundingType"][ft] = 1
        })

        if (_abs["healthOrgType"] in this.counts["healthOrgType"]) this.counts["healthOrgType"][_abs["healthOrgType"]] += 1
        else this.counts["healthOrgType"][_abs["healthOrgType"]] = 1

        if (_abs["programIsActive"] in this.counts["programIsActive"]) this.counts["programIsActive"][_abs["programIsActive"]] += 1
        else this.counts["programIsActive"][_abs["programIsActive"]] = 1

        if (_abs["programIsEvaluated"] in this.counts["programIsEvaluated"]) this.counts["programIsEvaluated"][_abs["programIsEvaluated"]] += 1
        else this.counts["programIsEvaluated"][_abs["programIsEvaluated"]] = 1

      })
    },
    clearFilters () {
      this.searchFilters.forEach(sf => {
        sf.options.forEach(o => o.checked = false)
      })
      this.searchText = ''
      this.performSearch()
      this.isFiltered = false
      this.recalculateCounts()
    },
    clearCounts () {
      this.counts = {
        countiesOffered: {},
        healthOrgType: {},
        programIsActive: {},
        programIsEvaluated: {},
        nmdohTargets: {},
        nmdohTargetPopulations: {},
        conditionFocus: {},
        programFundingType: {}
      }
    }
  },
})