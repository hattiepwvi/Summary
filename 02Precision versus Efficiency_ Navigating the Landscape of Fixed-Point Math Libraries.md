# Precision versus Efficiency: Navigating the Landscape of Fixed-Point Math Libraries

The FixedPointMathLib.sol and ABDKMath64x64.sol are both libraries that provide fixed-point arithmetic operations in Solidity, a statically-typed programming language designed for implementing smart contracts on various blockchain platforms, most notably, Ethereum. Fixed-point arithmetic is a type of arithmetic that is used to represent fractional numbers in a fixed number of bits, which is crucial in many blockchain applications.

| Feature                                | FixedPointMathLib.sol                                                                     | ABDKMath64x64.sol                                                                                                |
| :------------------------------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Functionality                          | Provides a wider range of functions, including exponentiation, square root, and cube root | Provides a common range of functions, primarily focused on comprehensive fixed-point operation                   |
| Efficiency                             | Generally more efficient, especially for complex operations                               | Less efficient for complex operations, but more efficient for simple operations like multiplication and division |
| Precision                              | Provides more precise results for large numbers                                           | Provides less precise results for large numbers                                                                  |
| Denomination-aware                     | Supports calculations in both raw units and WAD (10^18) denomination                      | Supports 64.64 fixed-point representation                                                                        |
| Suitability for financial calculations | Well-suited for a wide range of financial calculations                                    | Well-suited for efficient financial calculations                                                                 |

## Number Representation and Denomination-Awareness

FixedPointMathLib does not specify a fixed representation for numbers. The precision of the numbers is dependent on how the user of the library chooses to represent them. It provides basic arithmetic operations for fixed-point numbers. It supports calculations in both raw units and WAD (10^18) denomination. This denomination-awareness ensures consistency and accuracy across different financial calculations, making it well-suited for applications that require seamless integration with various units of measurement.

ABDKMath64x64, on the other hand, supports calculations in raw units only. This may limit its applicability in certain scenarios where denomination-awareness is crucial. However, ABDKMath64x64.sol uses a 64.64 fixed-point representation, meaning that each number is represented as a signed 128-bit integer with a denominator of 2^64. The 64.64 fixed-point representation allows for a wide range of values to be represented with a relatively small number of bits. This is because the fractional part of the number is represented by 64 bits, which provides a large range of possible values. At the same time, the fixed-point representation allows for a decent level of precision, because the fractional part of the number can be very small. This makes it suitable for applications that need to deal with real numbers, such as financial applications

```solidity
   // ABDKMath64x64.sol
/**
 * Smart contract library of mathematical functions operating with signed
 * 64.64-bit fixed point numbers.  Signed 64.64-bit fixed point number is
 * basically a simple fraction whose numerator is signed 128-bit integer and
 * denominator is 2^64.  As long as denominator is always the same, there is no
 * need to store it, thus in Solidity signed 64.64-bit fixed point numbers are
 * represented by int128 type holding only the numerator.
 */
```

## Functionality

FixedPointMathLib provides a broader range of functions, encompassing exponentiation, square root, cube root, and other complex mathematical operations. This comprehensive functionality makes it suitable for a wider variety of financial applications that require more intricate calculations.

In contrast, ABDKMath64x64 focuses primarily on comprehensive fixed-point operation. While it offers a more limited range of functions, it excels in efficiency for these fundamental operations.

```solidity
    // ixedPointMathLib.sol
                                                        +-----------+
                                                        |    Math   |
                                                        +-----------+
                                                             |
                                                +--------------+  +----------+
                                                | Simplified   |  | General  |
                                                | Fixed-Point  |  | Numeric  |
                                                | Operations   |  | Utilities|
                                                +--------------+  +----------+
                                                    |                  |
                                Arithmetic     Geometric       Trigonometric           Other
                        +---------------+  ---------------+    +-------------------+-------+------------+
                        |  lnWad        |  | rpow          |   |  sin             |  abs  |  factorial  |
                        |  powWad       |  | sqrt          |   |  cos             |  dist |  log2       |
                        |  expWad       |  | cbrt          |   |  tan             |  min  |  log2Up     |
                        |               |  | sqrtWad       |   |  asin            |  max  |  log10      |
                        +---------------+  ---------------+    |  acos            |  clamp|  log10Up    |
                                                               |  atan            |  gcd  |  log256     |
                                                               +-------------------+-------+------------+

```

Additionally, FixedPointMath utilizes custom errors to provide detailed information about the cause of an error, enhancing code clarity, self-documentation, error resilience, and informativeness compared to generic errors that hinder debugging and root cause identification used by ABDKMath64x64.

## Performance and Efficiency

Generally, FixedPointMathLib demonstrates higher efficiency for complex operations, such as exponentiation and square root calculations. Its optimized algorithms handle these operations with greater speed and resource utilization. The assembly code within these functions is used for low-level operations and checks.

However, ABDKMath64x64 exhibits superior efficiency for simple operations like fixed-point multiplication and division. Its streamlined design allows for faster execution of these common calculations. ABDKMath64x64 is designed for efficiency, with a focus on minimizing gas costs. It uses a number representation that allows for easier overflow detection, leading to cleaner and more efficient code. By using a binary representation, bit shift operators can also be used, which are usually much faster than decimal operators. This can lead to lower gas costs when performing fixed-point math operations in smart contracts.

```solidity
    // ABDKMath64x64.sol
  /**
   * Calculate arithmetics average of x and y, i.e. (x + y) / 2 rounding down.
   *
   * @param x signed 64.64-bit fixed point number
   * @param y signed 64.64-bit fixed point number
   * @return signed 64.64-bit fixed point number
   */
  function avg (int128 x, int128 y) internal pure returns (int128) {
    unchecked {
      return int128 ((int256 (x) + int256 (y)) >> 1);
    }
  }


```

In conclusion, while both libraries provide fixed-point arithmetic operations, ABDKMath64x64.sol provides a more advanced and efficient set of operations with a specific number representation, making it a more comprehensive and efficient choice for fixed-point arithmetic in Solidity.

## Precision

FixedPointMathLib maintains higher precision, particularly when dealing with large numbers. Its algorithms are designed to minimize rounding errors, ensuring accurate results even for complex calculations involving large values.

ABDKMath64x64, on the other hand, may exhibit some loss of precision for large numbers. Its focus on efficiency may compromise precision in certain scenarios where absolute accuracy is paramount.

In terms of precision in the traditional sense of fixed-point arithmetic, the mul function is dealing explicitly with fixed-point numbers, so it has a defined fractional part (64 bits). The mulWad function, on the other hand, performs multiplication and division with arbitrary 256-bit integers, which doesn't inherently have a fixed-point representation. The precision depends on the actual values of x and y passed to the function.

```solidity
//  FixedPointMathLib.sol

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

// ABDKMath64x64.sol

  /**
   * Calculate x * y rounding down.  Revert on overflow.
   *
   * @param x signed 64.64-bit fixed point number
   * @param y signed 64.64-bit fixed point number
   * @return signed 64.64-bit fixed point number
   */
  function mul (int128 x, int128 y) internal pure returns (int128) {
    unchecked {
      int256 result = int256(x) * y >> 64;
      require (result >= MIN_64x64 && result <= MAX_64x64);
      return int128 (result);
    }
  }

```

In summary, The choice between these two libraries depends on the nature of the numerical inputs and the desired level of precision. FixedPointMathLib is suitable for well-defined fixed-point numbers with a consistent structure. ABDKMath64x64 is more flexible, accommodating arbitrary large integers with varying precision based on specific input values.

## Suitability for Financial Calculations

FixedPointMathLib's comprehensive functionality, higher precision, and denomination-awareness make it well-suited for a wide range of financial calculations. It is particularly valuable for applications that require complex operations, high precision, and compatibility with different denominations.

ABDKMath64x64's superior efficiency for simple operations makes it a suitable choice for applications that primarily involve fixed-point multiplication and division. Its focus on speed and resource conservation may outweigh the need for more complex functionality or absolute precision in certain cases.

```solidity
// FixedPointMathLib.sol

/// @dev Returns `ln(x)`, denominated in `WAD`.
    function lnWad(int256 x) internal pure returns (int256 r) {
        unchecked {
            /// @solidity memory-safe-assembly
            assembly {
                if iszero(sgt(x, 0)) {
                    mstore(0x00, 0x1615e638) // `LnWadUndefined()`.
                    revert(0x1c, 0x04)
                }
            }

            // We want to convert x from 10**18 fixed point to 2**96 fixed point.
            // We do this by multiplying by 2**96 / 10**18. But since
            // ln(x * C) = ln(x) + ln(C), we can simply do nothing here
            // and add ln(2**96 / 10**18) at the end.

            // Compute k = log2(x) - 96, t = 159 - k = 255 - log2(x) = 255 ^ log2(x).
            int256 t;
            /// @solidity memory-safe-assembly
            assembly {
                t := shl(7, lt(0xffffffffffffffffffffffffffffffff, x))
                t := or(t, shl(6, lt(0xffffffffffffffff, shr(t, x))))
                t := or(t, shl(5, lt(0xffffffff, shr(t, x))))
                t := or(t, shl(4, lt(0xffff, shr(t, x))))
                t := or(t, shl(3, lt(0xff, shr(t, x))))
                // forgefmt: disable-next-item
                t := xor(t, byte(and(0x1f, shr(shr(t, x), 0x8421084210842108cc6318c6db6d54be)),
                    0xf8f9f9faf9fdfafbf9fdfcfdfafbfcfef9fafdfafcfcfbfefafafcfbffffffff))
            }

            // Reduce range of x to (1, 2) * 2**96
            // ln(2^k * x) = k * ln(2) + ln(x)
            x = int256(uint256(x << uint256(t)) >> 159);

            // Evaluate using a (8, 8)-term rational approximation.
            // p is made monic, we will multiply by a scale factor later.
            int256 p = x + 3273285459638523848632254066296;
            p = ((p * x) >> 96) + 24828157081833163892658089445524;
            p = ((p * x) >> 96) + 43456485725739037958740375743393;
            p = ((p * x) >> 96) - 11111509109440967052023855526967;
            p = ((p * x) >> 96) - 45023709667254063763336534515857;
            p = ((p * x) >> 96) - 14706773417378608786704636184526;
            p = p * x - (795164235651350426258249787498 << 96);

            // We leave p in 2**192 basis so we don't need to scale it back up for the division.
            // q is monic by convention.
            int256 q = x + 5573035233440673466300451813936;
            q = ((q * x) >> 96) + 71694874799317883764090561454958;
            q = ((q * x) >> 96) + 283447036172924575727196451306956;
            q = ((q * x) >> 96) + 401686690394027663651624208769553;
            q = ((q * x) >> 96) + 204048457590392012362485061816622;
            q = ((q * x) >> 96) + 31853899698501571402653359427138;
            q = ((q * x) >> 96) + 909429971244387300277376558375;
            /// @solidity memory-safe-assembly
            assembly {
                // Div in assembly because solidity adds a zero check despite the unchecked.
                // The q polynomial is known not to have zeros in the domain.
                // No scaling required because p is already 2**96 too large.
                r := sdiv(p, q)
            }

            // r is in the range (0, 0.125) * 2**96

            // Finalization, we need to:
            // * multiply by the scale factor s = 5.549…
            // * add ln(2**96 / 10**18)
            // * add k * ln(2)
            // * multiply by 10**18 / 2**96 = 5**18 >> 78

            // mul s * 5e18 * 2**96, base is now 5**18 * 2**192
            r *= 1677202110996718588342820967067443963516166;
            // add ln(2) * k * 5e18 * 2**192
            r += 16597577552685614221487285958193947469193820559219878177908093499208371 * (159 - t);
            // add ln(2**96 / 10**18) * 5e18 * 2**192
            r += 600920179829731861736702779321621459595472258049074101567377883020018308;
            // base conversion: mul 2**18 / 2**192
            r >>= 174;
        }
    }

// ABDKMath64x64.sol

  /**
   * Calculate natural logarithm of x.  Revert if x <= 0.
   *
   * @param x signed 64.64-bit fixed point number
   * @return signed 64.64-bit fixed point number
   */
  function ln (int128 x) internal pure returns (int128) {
    unchecked {
      require (x > 0);

      return int128 (int256 (
          uint256 (int256 (log_2 (x))) * 0xB17217F7D1CF79ABC9E3B39803F2F6AF >> 128));
    }
  }


```

For example, the two functions lnWad and ln are both used to calculate the natural logarithm of a number, but they have different advantages in financial calculations:

lnWad is a more specific function that is designed to calculate the natural logarithm of a number that is denominated in WAD. WAD is a fixed-point unit of measurement that is often used in financial calculations because it allows for more precise calculations. This makes lnWad ideal for calculations such as exchange rates and asset prices.

ln is a more general function that can be used to calculate the natural logarithm of any number, regardless of its scale. This makes it useful for a wide range of financial calculations, such as calculating compound interest, discounted cash flow, and risk-adjusted return.

## Conclusion

These two libararies have their own advantages and the choice between them depends on the specific requirements of the smart contract application. For applications that demand a wide range of complex mathematical operations, high precision, and denomination-awareness, FixedPointMathLib.sol is the preferred choice. However, for applications that prioritize efficiency for simple fixed-point multiplication and division, ABDKMath64x64.sol may be a better fit.
