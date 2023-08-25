// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/// @title A title that should describe the contract/interface
/// @author Mateus
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
contract SimpleStorage{
    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// @return someNumber the return variables of a contract’s function state variable
    uint256 public someNumber;
    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// @param _someNumber a parameter just like in doxygen (must be followed by parameter name)
    function setSomeNumber(uint256 _someNumber)external{
        someNumber = _someNumber;
    }
}