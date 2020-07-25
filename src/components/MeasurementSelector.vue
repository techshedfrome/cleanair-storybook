<template>
  <div class="column is-12-mobile is-8-desktop">
    <div class="subtitle is-size-6 has-text-weight-bold mb-0 has-text-black">
      Size of dust particale
      <i class="far fa-question-circle ml-1"></i>
    </div>
    <div
      class="pt-1 tabs is-toggle is-toggle-rounded is-centered has-text-black has-text-weight-medium"
      id="tabs"
    >
      <ul class="has-text-weight-medium is-warning">
        <li class="is-active is-warning" onclick="openTabNew('PM25',this)" id="PM25Selector">
          <a>
            <span class="has-text-black has-text-weight-bold">PM 2.5</span>
          </a>
        </li>

        <li class onclick="openTabNew('PM10',this)" id="PM10Selector">
          <a>
            <span class="has-text-black has-text-weight-bold">PM 10</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>