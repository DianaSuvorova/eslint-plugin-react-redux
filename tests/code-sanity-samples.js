module.exports = [
  'expect(() => useSelector()).toThrow();',
  `const rows = [];
      function mapStateToProps(state, ownProps) {
        for (const { value } of rows) {
        }
      }
  `,
  `const mapStateToProps = () => {
    return;
  };`,
];
