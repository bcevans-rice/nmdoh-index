<template>
  <!-- Edit-->
  <div class="mx-auto xl:px-36 lg:px-20 md:px-12">
    <EditAbstract :abstract="abstract" />
  </div>
</template>

<script setup>
import EditAbstract from '@/components/admin/EditAbstract.vue'
import { ref } from 'vue'

const abstract = ref({
 "PK": "PROG#R_2aPmOueTHDkUmJK",
 "SK": "PROG#R_2aPmOueTHDkUmJK",
 "conditionFocus": [
  "Diabetes"
 ],
 "contactEmail": "factorhealth@austin.utexas.edu",
 "contactFirstName": "Rhonda",
 "contactLastName": "Aubrey",
 "contactPhone": "",
 "countiesOffered": [
  "Travis"
 ],
 "healthOrgName": "Factor Health at Dell Medical School",
 "healthOrgPlanType": [
 ],
 "healthOrgType": "Educational Institution",
 "metaIsShownInIndex": true,
 "metaSubmittedDate": "2023-06-26 13:41:03",
 "nmdohTargetPopulations": [
  "Other - Patients 55-90"
 ],
 "nmdohTargets": [
  "Food/Hunger/Nutrition",
  "Social Support/Social Isolation"
 ],
 "programFunding": "Episcopal Health Foundation, St. David's Foundation (meals) and Dell Medical School",
 "programIsActive": "Active",
 "programIsEvaluated": "No",
 "programName": "Meals4Me",
 "programOperation": "Meals4Me is a 12-month long randomized control trial comparing different delivery models of medically tailored meals for people with diabetes. The three types of meal delivery are: a warm daily delivered meal, weekly drop-shipped frozen meals, and a control. This program tests the impact on A1c levels as well as the possible impact of the social connection offered by the daily warm meal delivery.",
 "programUrl": "",
 "responseID": "R_2aPmOueTHDkUmJK"
})

</script>

<style scoped>

</style>