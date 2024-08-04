// Este aninhamentos de rotas por algum motivo não está funcionando no vue 3

// const Rental = () => import('./Rental.vue');
// const RentalFormComponent = () => import('./components/RentalFormComponent.vue');
// const RentalListComponent = () => import('./components/RentalList.vue');

// export default {
//   path: '/rental',
//   component: Rental,
//   meta: {
//     title: 'Rental',
//   },
//   children: [
//     {
//       path: '/',
//       name: 'rental-list',
//       component: RentalListComponent,
//     },
//     {
//       path: '/new-rental',
//       name: 'rental-form',
//       component: RentalFormComponent,
//     },
//     {
//       path: '/edit-rental/:id',
//       name: 'rental-edit-form',
//       component: RentalFormComponent,
//     },
//   ]
// }