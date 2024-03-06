# Unlocking the Power of Fixed-Point Numbers for Financial Applications

Fixed-point arithmetic is intricate yet powerful, and exploration can deepen our understanding and uncover its applications.

```solidity
"The important thing is not to stop questioning. Curiosity has its own reason for existence." - Albert Einstein
```

## Introduction

Fixed-point numbers are a way of representation allocates a fixed number of digits for the fractional part of a number, often used in systems without floating-point support due to its speed and low power consumption. For example, if you want to store the number 123.456, you could decide to store 123456 (without the decimal point) and then remember that the last three digits represent the fractional part. Fixed-point arithmetic involves operations like addition, subtraction, and multiplication on fixed-point numbers, using software-determined binary points, allowing the same hardware to perform operations on numbers of different scales.

Fixed point numbers in Solidity are declared using fixed or ufixed, followed by the number of bits M and decimal points N. For example, fixed128x18 signifies a signed fixed point number with 128 bits, out of which 18 are dedicated to the fractional part. While Solidity doesn't fully support fixed point numbers yet, allowing declarations but not assignments, it's important for financial applications that often require calculations involving fractional numbers, such as interest rates or currency conversions.

```solidity
Regular number 123.45
uint balance = 1234500000000000000000
uint decimals = 18

Regular decimal arithetic:
1.2 * 3.4 = 4.08
Regular integer arithmetic:
120 * 340 = 40800
```

Libraries provide a way to perform fixed point arithmetic, despite the limitations of Solidity's native support for fixed point numbers. Fixed point math implementation can be complex to require careful handling of overflows and underflows to prevent errors or crashes. Libraries like Solady and ABDK provide pre-tested functions for performing fixed point math accurately and efficiently, ensuring correct results. These libraries can also reduce gas costs compared to manual implementations due to their optimized code.

## Overview

Solady FixedPointMath is such a library of arithmetic, fixed-point, and numerical utility functions. It provides a variety of mathematical operations that are useful for various applications in the blockchain ecosystem.

| Category                          | Functions                                                                                                                                                                                                                                                                                                                                                                                  | Purpose                                                                                                                                                       |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arithmetic Operations             | lnWad(int256 x), powWad(int256 x, int256 y), expWad(int256 x)                                                                                                                                                                                                                                                                                                                              | Basic arithmetic operations such as logarithms, exponentiation to perform calculations on numbers of various types, including integers, floats, and decimals. |
| Simplified Fixed-Point Operations | mulWad(uint256 x, uint256 y), mulWadUp(uint256 x, uint256 y), divWad(uint256 x, uint256 y), divWadUp(uint256 x, uint256 y)                                                                                                                                                                                                                                                                 | Simplified fixed-point operations that round the result of multiplication or division up or down.                                                             |
| General Numeric Utilities         | fullMulDiv(uint256 x, uint256 y, uint256 d), fullMulDivUp(uint256 x, uint256 y, uint256 d), mulDiv(uint256 x, uint256 y, uint256 d), mulDivUp(uint256 x, uint256 y, uint256 d), divUp(uint256 x, uint256 d), zeroFloorSub(uint256 x, uint256 y)                                                                                                                                            | General numeric utilities for various calculations, including full precision division, rounded division, and division with rounding up.                       |
| Math Functions                    | rpow(uint256 x, uint256 y, uint256 b), sqrt(uint256 x), cbrt(uint256 x), sqrtWad(uint256 x), cbrtWad(uint256 x), factorial(uint256 x), log2(uint256 x), log2Up(uint256 x), log10(uint256 x), log10Up(uint256 x), log256(uint256 x), log256Up(uint256 x), sci(uint256 x), packSci(uint256 x), unpackSci(uint256 packed), avg(uint256 x, uint256 y)                                          | Advanced mathematical functions, including exponentiation with a base, square root, cube root, logarithm, and factorial.                                      |
| Statistical Functions             | abs(int256 x), dist(int256 x, int256 y), min(uint256 x, uint256 y), min(int256 x, int256 y), max(uint256 x, uint256 y), max(int256 x, int256 y), clamp(uint256 x, uint256 minValue, uint256 maxValue), clamp(int256 x, int256 minValue, int256 maxValue), gcd(uint256 x, uint256 y)                                                                                                        | Statistical functions for calculating various statistical measures, such as absolute value, distance, minimum, maximum, and greatest common divisor.          |
| Raw Number Operations             | rawAdd(uint256 x, uint256 y), rawAdd(int256 x, int256 y), rawSub(uint256 x, uint256 y), rawSub(int256 x, int256 y), rawMul(uint256 x, uint256 y), rawMul(int256 x, int256 y), rawDiv(uint256 x, uint256 y), rawSDiv(int256 x, int256 y), rawMod(uint256 x, uint256 y), rawSMod(int256 x, int256 y), rawAddMod(uint256 x, uint256 y, uint256 d), rawMulMod(uint256 x, uint256 y, uint256 d) | Raw number operations that perform basic arithmetic without checking for overflow or underflow. These operations are useful for low-level programming.        |

## Solidity v0.8 Features: Custom Errors and Unchecked Arithmaetic

Solady FixedPointMath uses custom errors to provide more specific information about the cause of an error. It leverages the latest features added in Solidity v0.8 to make code more specific, self-documenting, error-resistant, and informative, compared to Non-custom errors which is difficult to debug code and identify the root cause of a problem.

Here are some specific examples of how custom errors can be used to improve fixed-point math contracts:

```solidity
/// @dev The operation failed, as the output exceeds the maximum value of uint256.
    error ExpOverflow();

    /// @dev The operation failed, as the output exceeds the maximum value of uint256.
    error FactorialOverflow();

    /// @dev The operation failed, due to an overflow.
    error RPowOverflow();

    /// @dev The mantissa is too big to fit.
    error MantissaOverflow();

    /// @dev The operation failed, due to an multiplication overflow.
    error MulWadFailed();

    /// @dev The operation failed, either due to a
    /// multiplication overflow, or a division by a zero.
    error DivWadFailed();
```

The errors of ExpOverflow(), FactorialOverflow(), RPowOverflow(), and MantissaOverflow() can be used to indicate overflow in exponential, factorial, RPow and mantissa operations respectively. This can help developers to avoid situations where the result of operations are too large to fit in uint256 variables.

The MulWadFailed() and DivWadFailed() errors can be used to indicate that a multiply-divide operation has failed. This can help developers to identify and fix situations where the result of a multiply-divide operation is too large or too small to be represented accurately.

Additionally, The unchecked block is used to disable Solidity's built-in overflow and underflow checks for the operations within it. This is done to increase the performance of the functions, as these checks can be computationally expensive.

```solidity
    /// @dev Convenience function for unpacking a packed number from `packSci`.
    function unpackSci(uint256 packed) internal pure returns (uint256 unpacked) {
        unchecked {
            unpacked = (packed >> 7) * 10 ** (packed & 0x7f);
        }
    }


```

## Rounding Down or Up

The functions are designed to handle operations such as multiplication, division, exponentiation, and logarithms on unsigned and signed 256-bit integers, with the results rounded down or up as needed.

For example, the mulWad and mulWadUp functions are used for multiplication operations. They multiply two numbers x and y, and then divide the result by a constant WAD. The difference between the two functions is that mulWad rounds the result down, while mulWadUp rounds it up.

```solidity
    /// @dev Equivalent to `(x * y) / WAD` rounded down.
    function mulWad(uint256 x, uint256 y) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Equivalent to `require(y == 0 || x <= type(uint256).max / y)`.
            if mul(y, gt(x, div(not(0), y))) {
                mstore(0x00, 0xbac65e5b) // `MulWadFailed()`.
                revert(0x1c, 0x04)
            }
            z := div(mul(x, y), WAD)
        }
    }

    /// @dev Equivalent to `(x * y) / WAD` rounded up.
    function mulWadUp(uint256 x, uint256 y) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Equivalent to `require(y == 0 || x <= type(uint256).max / y)`.
            if mul(y, gt(x, div(not(0), y))) {
                mstore(0x00, 0xbac65e5b) // `MulWadFailed()`.
                revert(0x1c, 0x04)
            }
            z := add(iszero(iszero(mod(mul(x, y), WAD))), div(mul(x, y), WAD))
        }
    }
```

Rounding down or up can reduce the amount of precision required to store the result. Fixed-point numbers have a limited range of precision, which means that they cannot represent very large or very small numbers accurately. However, rounding down or up can improve the efficiency of the contract, as it reduces the amount of memory that needs to be used. It can also make the results of fixed-point operations more predictable.

This can be important for contracts that need to have consistent results, such as financial contracts. In a financial contract, rounding down can help to prevent rounding errors from causing significant losses. For example, if a contract is designed to pay out 100 tokens, rounding down to the nearest integer will ensure that the contract always pays out at least 100 tokens.

Overall, rounding down or up the results of fixed-point operations can be a valuable tool for improving the efficiency, predictability, and fairness of smart contracts. However, it is important to use rounding with caution, as it can also introduce errors. For example, if a contract is designed to track a very large number, rounding down or up could cause the contract to lose track of the number.

## Low-level Operations: Gas Efficient, but Still User-friendly

The assembly code within these functions is used for low-level operations and checks. For example, the if iszero(mul(d, iszero(mul(y, gt(x, div(not(0), y)))))) line checks if d is zero or if x is greater than the maximum possible value that can be divided by y without causing an overflow. If this condition is true, the function reverts with a specific error message.

The assembly code also includes operations for performing arithmetic operations and comparisons, as well as for handling memory. For example, the mstore(0x00, 0xad251c27) line stores the error message at memory location 0x00, and the revert(0x1c, 0x04) line causes the function to revert and consume 0x1c gas.

```solidity
    /// @dev Returns `ceil(x * y / d)`.
    /// Reverts if `x * y` overflows, or `d` is zero.
    function mulDivUp(uint256 x, uint256 y, uint256 d) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Equivalent to require(d != 0 && (y == 0 || x <= type(uint256).max / y))
            if iszero(mul(d, iszero(mul(y, gt(x, div(not(0), y)))))) {
                mstore(0x00, 0xad251c27) // `MulDivFailed()`.
                revert(0x1c, 0x04)
            }
            z := add(iszero(iszero(mod(mul(x, y), d))), div(mul(x, y), d))
        }
    }
```

They use assembly code for low-level operations and checks, which can increase the performance of the functions.

## Feature Rich: Valuable Tools for Decentralized Finance (DeFi)

These functions are also useful when dealing with fixed-point numbers, which are common in financial applications. The rpow function is used to calculate the exponentiation of a number x to the power of y by squaring, denominated in base b. The sqrt function returns the square root of a number x. It uses a method known as the Babylonian method for approximating the square root of a number. The cbrt function returns the cube root of a number x. The sqrtWad and cbrtWad functions return the square root and cube root of a number x, respectively, denominated in WAD.

```solidity
    /// @dev Exponentiate `x` to `y` by squaring, denominated in base `b`.
    /// Reverts if the computation overflows.
    function rpow(uint256 x, uint256 y, uint256 b) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            z := mul(b, iszero(y)) // `0 ** 0 = 1`. Otherwise, `0 ** n = 0`.
            if x {
                z := xor(b, mul(xor(b, x), and(y, 1))) // `z = isEven(y) ? scale : x`
                let half := shr(1, b) // Divide `b` by 2.
                // Divide `y` by 2 every iteration.
                for { y := shr(1, y) } y { y := shr(1, y) } {
                    let xx := mul(x, x) // Store x squared.
                    let xxRound := add(xx, half) // Round to the nearest number.
                    // Revert if `xx + half` overflowed, or if `x ** 2` overflows.
                    if or(lt(xxRound, xx), shr(128, x)) {
                        mstore(0x00, 0x49f7642b) // `RPowOverflow()`.
                        revert(0x1c, 0x04)
                    }
                    x := div(xxRound, b) // Set `x` to scaled `xxRound`.
                    // If `y` is odd:
                    if and(y, 1) {
                        let zx := mul(z, x) // Compute `z * x`.
                        let zxRound := add(zx, half) // Round to the nearest number.
                        // If `z * x` overflowed or `zx + half` overflowed:
                        if or(xor(div(zx, x), z), lt(zxRound, zx)) {
                            // Revert if `x` is non-zero.
                            if iszero(iszero(x)) {
                                mstore(0x00, 0x49f7642b) // `RPowOverflow()`.
                                revert(0x1c, 0x04)
                            }
                        }
                        z := div(zxRound, b) // Return properly scaled `zxRound`.
                    }
                }
            }
        }
    }
```

Here are some specific examples of how they can be used to improve fixed-point math contracts:

In a lending protocol, borrowers can borrow assets from lenders, and interest is accrued over time. For calculating interest payments in a lending protocol, the rpow() function can be used to calculate the exponential growth of the principal amount over time, while the sqrt() and cbrt() functions can be used to calculate interest rates and fees based on complex formulas.

Addtionlaly, decentralized exchanges (DEXs) rely on price oracles to provide accurate price feeds for asset pairs. To implement price oracles for decentralized exchanges, the sqrtWad() and cbrtWad() functions can be used to implement price oracles that calculate prices based on various market data sources, such as decentralized exchanges and liquidity pools.

These examples demonstrate the versatility of the provided functions in supporting various financial calculations and applications in the DeFi ecosystem. By providing efficient, precise, and denomination-aware mathematical operations, these functions contribute to the development of robust and reliable DeFi applications.

## Conclusion

Fixed-point math libraries are valuable tool for smart contract development in the DeFi ecosystem. They provide a variety of functions for performing fixed-point math operations, including exponentiation, square root, cube root, and raw addition, subtraction, multiplication, division, and modulo. These functions are designed for efficiency and precision, and they are suitable for a wide range of financial calculations, such as lending protocols, portfolio management, decentralized exchanges (DEXs), yield farming and derivative products.
