import {
  getManhattanDistance,
  getEuclideanDistance,
  isValidPosition,
} from '#utils/distance.utils'

describe('Distance utils', () => {
  const points = [
    {
      origin: {
        x: 0,
        y: 0,
      },
      destination: {
        x: 0,
        y: 0,
      },
    },
    {
      origin: {
        x: 0,
        y: 0,
      },
      destination: {
        x: 2,
        y: 3,
      },
    },
    {
      origin: {
        x: 1,
        y: 1,
      },
      destination: {
        x: 2,
        y: 3,
      },
    },
    {
      origin: {
        x: -1,
        y: -3,
      },
      destination: {
        x: 2,
        y: 3,
      },
    },
    {
      origin: {
        x: 2,
        y: 3,
      },
      destination: {
        x: -1,
        y: -3,
      },
    },
    {
      origin: {
        x: -2,
        y: -5,
      },
      destination: {
        x: -1,
        y: -3,
      },
    },
    {
      origin: {
        x: 47.6,
        y: -122.4,
      },
      destination: {
        x: 47.581,
        y: -122.316,
      },
    },
    {
      origin: {
        x: '0',
        y: 0,
      },
      destination: {
        x: 2,
        y: '3',
      },
    },
  ]

  describe('getManhattanDistance', () => {
    test.each([
      [
        {
          ...points[0],
          expected: 0,
        },
      ],
      [
        {
          ...points[1],
          expected: 5,
        },
      ],
      [
        {
          ...points[2],
          expected: 3,
        },
      ],
      [
        {
          ...points[3],
          expected: 9,
        },
      ],
      [
        {
          ...points[4],
          expected: 9,
        },
      ],
      [
        {
          ...points[5],
          expected: 3,
        },
      ],
      [
        {
          ...points[6],
          expected: 0.103,
        },
      ],
      [
        {
          ...points[7],
          expected: 5,
        },
      ],
    ])(
      'should compute the correct Manhattan distance from $origin to $destination',
      ({ origin, destination, expected }) => {
        expect(getManhattanDistance(origin, destination)).toBe(expected)
      }
    )

    it('should throw error if position coordinates are not valid', () => {
      expect(() =>
        getManhattanDistance(
          {
            x: 'invalid',
            y: 0,
          },
          { x: 1, y: 2 }
        )
      ).toThrow('invalid position')
    })
  })

  describe('getEuclideanDistance', () => {
    it.each([
      [
        {
          ...points[0],
          expected: '0.0000',
        },
      ],
      [
        {
          ...points[1],
          expected: '3.6056',
        },
      ],
      [
        {
          ...points[2],
          expected: '2.2361',
        },
      ],
      [
        {
          ...points[3],
          expected: '6.7082',
        },
      ],
      [
        {
          ...points[4],
          expected: '6.7082',
        },
      ],
      [
        {
          ...points[5],
          expected: '2.2361',
        },
      ],
      [
        {
          ...points[6],
          expected: '0.0861',
        },
      ],
      [
        {
          ...points[7],
          expected: '3.6056',
        },
      ],
    ])(
      'should compute the correct Euclidean distance from $origin to $destination',
      ({ origin, destination, expected }) => {
        expect(getEuclideanDistance(origin, destination)).toBe(expected)
      }
    )

    it('should throw error if position coordinates are not valid', () => {
      expect(() =>
        getEuclideanDistance(
          {
            x: 'invalid',
            y: 0,
          },
          { x: 1, y: 2 }
        )
      ).toThrow('invalid position')
    })
  })

  describe('isValidPosition', () => {
    it.each([
      [
        {
          position: {
            x: 43.12,
            y: -112.3,
          },
          expected: true,
        },
      ],
      [
        {
          position: {
            x: '',
            y: -112.3,
          },
          expected: true,
        },
      ],
      [
        {
          position: {
            x: 'abc',
            y: -112.3,
          },
          expected: false,
        },
      ],
    ])('should validate the position', ({ position, expected }) => {
      expect(isValidPosition(position)).toBe(expected)
    })
  })
})
