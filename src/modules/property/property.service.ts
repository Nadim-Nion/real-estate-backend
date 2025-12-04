import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/common/repository/user/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'src/utils/pagination';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async createProperty(payload: CreatePropertyDto, user: any) {
    try {
      const {
        name,
        slug,
        description,
        location,
        price,
        bedrooms,
        bathrooms,
        aminities,
        status,
        category_id,
      } = payload;

      // Check only admin create property
      const isAdmin = await UserRepository.getUserDetails(user.userId);

      if (!isAdmin || isAdmin.type !== 'admin') {
        throw new ConflictException('Only admin can create property');
      }

      const result = await this.prisma.property.create({
        data: {
          name,
          slug,
          description,
          location,
          price,
          bedrooms,
          bathrooms,
          aminities,
          status,
          category: {
            connect: { id: category_id },
          },
          user: {
            connect: { id: user.userId },
          },
        },
      });

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Property created successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || 'Failed to create property',
      };
    }
  }

  async findAllProperties(page: number, limit: number) {
    try {
      const { result, totalCount, totalPages } = await getPagination(
        this.prisma.property,
        page,
        limit,
      );

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'All Properties retrieved successfully',
        metaData: {
          totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || 'Failed to create property',
      };
    }
  }

  async findOneProperty(id: string) {
    try {
      const result = await this.prisma.property.findUnique({
        where: { id },
      });

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Property retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || 'Failed to create property',
      };
    }
  }

  async update(id: string, payload: UpdatePropertyDto, user: any) {
    try {
      // Check only admin update property
      const isAdmin = await UserRepository.getUserDetails(user.userId);

      if (!isAdmin || isAdmin.type !== 'admin') {
        throw new ConflictException('Only admin can update property');
      }

      const result = await this.prisma.property.update({
        where: { id },
        data: {
          ...payload,
        },
      });

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Property updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || 'Failed to create property',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
