import { connect } from 'react-redux'
import { keepSkill, fetchSkill } from './../modules/SkillModules'
import { fetchProductsMap } from '../../../../../modules/products'
import SkillsPage from './../components/SkillsPage'

const mapDispatchtoProps = {
  fetchProductsMap,
  fetchSkill,
  keepSkill
}

const mapStateToProps = (state) => ({
  login: state.islogin,
  products: state.products,
  skill: state.skills
})

export default connect(mapStateToProps, mapDispatchtoProps)(SkillsPage)
